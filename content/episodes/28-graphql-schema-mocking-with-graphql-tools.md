---
title: GraphQL Schema Mocking with GraphQL Tools
description: Build faster frontends with mocking. Enable frontend teams to focus on building functionality and UI without waiting for the backend implementation.
published: 2022-02-07
video: https://www.youtube.com/watch?v=xDpvoflaKKE
repo: null
instructor: instructors/jamie-barton.md
---

- [Casual on NPM](https://www.npmjs.com/package/casual)
- [GraphQL Tools](https://www.graphql-tools.com/docs/mocking)

```graphql
type Query {
  users: [User!]!
  posts: [Post!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int!
  posts: [Post]
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
```

```js
const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks: {
    String: () => casual.sentence,
    Int: () => casual.integer(1, 100),
    User: () => ({
      id: casual.uuid,
      name: casual.name,
      email: casual.email,
      age: casual.integer(18, 122),
    }),
    Post: () => ({
      id: casual.uuid,
      title: casual.sentence,
      content: casual.sentences(5),
    }),
  },
});
```
