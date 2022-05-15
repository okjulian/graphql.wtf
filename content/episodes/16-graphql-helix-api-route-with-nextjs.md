---
title: GraphQL Helix API Route with Next.js
description: We'll use utility functions from GraphQL Helix to process requests inside our API route made from the Next.js frontend.
published: 2021-11-15
video: https://www.youtube.com/watch?v=QR7AymMboZc
repo: https://github.com/notrab/graphql.wtf-graphql-helix-nextjs
instructor: instructors/jamie-barton.md
---

- [GraphQL Helix](https://github.com/contra/graphql-helix)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

```js
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
  renderGraphiQL,
} from "graphql-helix";

const typeDefs = `
  type Query {
    episodes: [Episode]
    episode(id: ID!): Episode
  }

  type Episode {
    id: ID
    title: String
  }
`;

const episodes = [
  {
    id: "1",
    title: "GraphQL Mesh as a Gateway",
  },
  {
    id: "2",
    title: "Type safe GraphQL queries with genql",
  },
  {
    id: "3",
    title: "Authorization with GraphQL Shield",
  },
  {
    id: "4",
    title: "Rename GraphQL fields with aliases",
  },
];

const resolvers = {
  Query: {
    episodes: () => episodes,
    episode: (_, args) => episodes.find((ep) => ep.id === args.id),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default async function handler(req, res) {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: "/api",
      })
    );
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    sendResult(result, res);
  }
}
```
