---
title: GraphQL Remote Schema Stitching
description: Stitch together remote APIs using GraphQL Tools, and delegate requests across schemas.
published: 2021-10-18
video: https://www.youtube.com/watch?v=gyxYRvfCpAs
repo: https://github.com/notrab/graphql.wtf-remote-schema-stitching
instructor: instructors/jamie-barton.md
---

- `https://api.cartql.com`
- `https://api-eu-central-1.graphcms.com/v2/ckrvra12f06pb01z82dn2ebd4/master`

```js
const { print } = require("graphql");
const { rawRequest } = require("graphql-request");
const {
  wrapSchema,
  introspectSchema,
  RenameTypes,
  RenameRootFields,
} = require("@graphql-tools/wrap");
const { stitchSchemas } = require("@graphql-tools/stitch");
const { delegateToSchema } = require("@graphql-tools/delegate");
```

```js
const createRemoteSchema = async ({ url, ...rest }) => {
  const executor = async ({ document, variables }) => {
    const query = typeof document === "string" ? document : print(document);

    return await rawRequest(url, query, variables);
  };

  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
    ...rest,
  });

  return schema;
};
```

```js
const cartSchema = await createRemoteSchema({
  url: "https://api.cartql.com/",
  transforms: [
    new RenameRootFields((_, fieldName) => `CartQL_${fieldName}`),
    new RenameTypes((name) => `CartQL_${name}`),
  ],
});

const cmsSchema = await createRemoteSchema({
  url: "https://api-eu-central-1.graphcms.com/v2/ckrvra12f06pb01z82dn2ebd4/master",
  transforms: [
    new RenameRootFields((_, fieldName) => `CMS_${fieldName}`),
    new RenameTypes((name) => `CMS_${name}`),
  ],
});

const schema = await stitchSchemas({
  subschemas: [cartSchema, cmsSchema],
  typeDefs: `
        extend type CartQL_CartItem {
          product(stage: CMS_Stage): CMS_Product
        }
      `,
  resolvers: {
    CartQL_CartItem: {
      product: {
        selectionSet: `{ id }`,
        resolve: (parent, args, context, info) => {
          return delegateToSchema({
            schema: cmsSchema,
            operation: "query",
            fieldName: "CMS_product",
            args: {
              where: {
                id: parent.id,
              },
              ...(args.stage && { stage: args.stage }),
            },
            context,
            info,
          });
        },
      },
    },
  },
});
```
