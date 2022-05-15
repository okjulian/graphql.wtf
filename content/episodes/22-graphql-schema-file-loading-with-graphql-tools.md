---
title: GraphQL schema file loading with GraphQL Tools
description: Load GraphQL schema from a single file, or multiple using the GraphQL File Loader.
published: 2021-12-27
video: https://youtu.be/I79_b7K0rIk
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphQL Tools docs](https://www.graphql-tools.com/docs/schema-loading)

```js
const { printSchema } = require("graphql");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

const typeDefs = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

console.log(printSchema(typeDefs));
```

```js
const { printSchema } = require("graphql");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

console.log(printSchema(typeDefs));
```

```graphql
# import Review from "reviews.graphql"

type Query {
  product(id: ID!): Product!
  products: [Product!]!
}

type Product {
  id: ID!
  name: String!
  description: String!
  price: Int!
  reviews: [Review!]!
}
```

```graphql
type Review {
  name: String!
  message: String!
}
```
