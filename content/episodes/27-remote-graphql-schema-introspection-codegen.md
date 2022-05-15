---
title: Remote GraphQL Schema Introspection Codegen
description: Automatically introspect your stitched GraphQL schemas endpoints, and use the results to execute requests to remote schemas.
published: 2022-01-31
video: https://youtu.be/0nryzovq05s
repo: https://github.com/notrab/graphql.wtf-remote-schema-codegen
instructor: instructors/jamie-barton.md
---

- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [Introspection Plugin](https://www.graphql-code-generator.com/plugins/introspection)
- [`buildClientSchema` docs](https://graphql.org/graphql-js/utilities/#buildclientschema)
- [Episode 12](https://graphql.wtf/episodes/12-graphql-remote-schema-stitching)

```yml
generates:
  ./generated/cartql.json:
    schema: https://api.cartql.com
    plugins:
      - introspection
  ./generated/graphcms.json:
    schema: https://api-eu-central-1.graphcms.com/v2/ckrvra12f06pb01z82dn2ebd4/master
    plugins:
      - introspection
```

```js
const { buildClientSchema } = require("graphql");

const cartqlIntrospectionResult = require("./generated/cartql.json");
const graphcmsIntrospectionResult = require("./generated/graphcms.json");

const cartQLSchema = buildClientSchema(cartqlIntrospectionResult);
const graphcmsSchema = buildClientSchema(graphcmsIntrospectionResult);
```

```js
const createRemoteSchema = async ({ schema, url, ...rest }) => {
  const executor = async ({ document, variables }) => {
    const query = typeof document === "string" ? document : print(document);

    return await rawRequest(url, query, variables);
  };

  return wrapSchema({
    schema,
    executor,
    ...rest,
  });
};
```
