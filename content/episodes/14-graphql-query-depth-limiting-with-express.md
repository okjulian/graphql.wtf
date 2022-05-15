---
title: GraphQL Query Depth Limiting with Express
description: Learn how to add validation rules to Express GraphQL to set a depth limit on queries.
published: 2021-11-01
video: https://www.youtube.com/watch?v=b7OwR1gs-xA
repo: null
instructor: instructors/jamie-barton.md
---

- [`graphql-depth-limit`](https://www.npmjs.com/package/graphql-depth-limit)

```js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const depthLimit = require("graphql-depth-limit");

const typeDefs = `
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String!
    related: [Post]
  }
`;

const posts = [{ id: "graphql", title: "Learn GraphQL with GraphQL.wtf" }];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, args) => posts.find((post) => post.id === args.id),
  },
  Post: {
    related: () => posts,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    validationRules: [
      depthLimit(4, {
        ignore: ["related"],
      }),
    ],
  }))
);

app.listen(4000, () => {
  console.log(`Server listening on http://localhost:4000`);
});
```
