---
title: Merge Resolvers with GraphQL Tools
description: Load and merge GraphQL resolvers from multiple files using GraphQL Tools.
published: 2022-01-03
video: https://www.youtube.com/watch?v=6Jd5nKQrqcU
repo: https://github.com/notrab/graphql.wtf-merging-resolvers
instructor: instructors/jamie-barton.md
---

- [GraphQL Tools](https://www.graphql-tools.com)
- [Jest](https://jestjs.io)

```js
const path = require("path");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolverFiles = loadFilesSync(path.join(__dirname, "resolvers"));

const typeDefs = /* GraphQL */ `
  type Query {
    products: [Product!]!
    reviews: [Review!]!
  }

  type Product {
    name: String!
    price: Int!
  }

  type Review {
    message: String!
    author: String!
  }
`;

const resolvers = mergeResolvers(resolverFiles);

const schema = makeExecutableSchema({ typeDefs, resolvers });
```

```js
const resolverFiles = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
```

```js
const faker = require("faker");

module.exports = {
  Query: {
    products: (parent, args, context, info) =>
      Array.from({ length: 10 }, (_, i) => ({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
      })),
  },
};
```

```js
const faker = require("faker");

module.exports = {
  Query: {
    reviews: (parent, args, context, info) =>
      Array.from({ length: 5 }, () => ({
        message: faker.lorem.sentence(),
        author: faker.name.findName(),
      })),
  },
};
```

```js
const { graphql } = require("graphql");

const { schema } = require("./");

test("should fetch products", async () => {
  const result = await graphql({
    schema,
    source: /* GraphQL */ `
      {
        products {
          name
          price
        }
      }
    `,
  });

  expect(result.data.products).toBeDefined();
  expect(result.data.products.length).toBe(10);
});

test("should fetch reviews", async () => {
  const result = await graphql({
    schema,
    source: /* GraphQL */ `
      {
        reviews {
          message
          author
        }
      }
    `,
  });

  expect(result.data.reviews).toBeDefined();
  expect(result.data.reviews.length).toBe(5);
});
```
