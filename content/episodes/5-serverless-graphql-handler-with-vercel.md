---
title: Serverless GraphQL handler with Vercel
description: Execute GraphQL queries and mutations inside a serverless function hosted by Vercel.
published: 2021-08-30
video: https://www.youtube.com/watch?v=oTjhLCtAqxQ
repo: null
instructor: instructors/jamie-barton.md
---

- [graphql.js](https://www.npmjs.com/package/graphql)
- [GraphQL Tools](https://www.npmjs.com/package/@graphql-tools/schema)
- [Vercel docs](https://vercel.com/docs/serverless-functions/introduction)

```js
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLError } from "graphql";

const typeDefs = `
  type Query {
    users: [User]
  }

  type User {
    username: String!
    avatar: String!
  }
`;

const resolvers = {
  Query: {
    users: () => [
      {
        username: "notrab",
      },
      {
        username: "rauchg",
      },
    ],
  },
  User: {
    avatar: (root) => `https://github.com/${root.username}.png`,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
```

```js
export default async (req, res) => {
  const { method, body, query: qs } = req;

  if (method !== "GET" && method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "GET,POST")
      .send("Method not allowed");
  }

  if (!qs.query && method === "GET")
    return res.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message: "GET query missing",
    });

  const { query, variables, operationName } = method === "GET" ? qs : body;

  try {
    const result = await graphql(
      schema,
      query,
      null,
      null,
      variables,
      operationName
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(new GraphQLError(err.message));
  }
};
```
