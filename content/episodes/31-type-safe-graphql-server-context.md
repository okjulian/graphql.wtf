---
title: Type safe GraphQL server context
description: Add type safety to your GraphQL server context with GraphQL Code Generator plugin "TypeScript Resolvers".
published: 2022-02-28
video: https://youtu.be/gDrTGqdaaJA
repo: https://github.com/notrab/graphql.wtf-context-type-codegen
instructor: instructors/jamie-barton.md
---

- [GraphQL Code Generator](https://www.graphql-code-generator.com)
- [TypeScript Resolvers Plugin](https://www.graphql-code-generator.com/plugins/typescript-resolvers)
- [GraphQL Yoga](https://graphql-yoga.com/)

```yaml
overwrite: true
schema: "schema.graphql"
# documents: "**/*.graphql"
generates:
  types.ts:
    config:
      contextType: ./server#GraphQLContext
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-resolvers"
```

```ts
import { createServer, YogaInitialContext } from "@graphql-yoga/node";

import { Resolvers } from "./types";

export interface GraphQLContext extends YogaInitialContext {
  specialContextValue: number;
}

const resolvers: Resolvers = {
  Query: {
    hello: (_, __, { specialContextValue }) => `world ${specialContextValue}`,
  },
};

const server = createServer({
  context: ({ request }) => ({
    request,
    specialContextValue: 31,
  }),
});
```
