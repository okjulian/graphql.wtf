---
title: Response Cache Plugin with Envelop
description: Skip the GraphQL execution phase with the response cache plugin for Envelop. Set TTL for types and fields, as well as cache results in-memory, or with your own KV store.
published: 2022-03-21
video: https://youtu.be/1EBphPltkA4
repo: https://github.com/notrab/graphql.wtf-envelop-response-cache
instructor: instructors/jamie-barton.md
---

- [Envelop](https://www.envelop.dev)
- [Response Cache Plugin](https://www.envelop.dev/plugins/use-response-cache)
- [GraphQL Yoga](https://graphql-yoga.com)

```json
{
  "data": {
    "users": [
      {
        "id": "jb",
        "name": "Jamie"
      }
    ]
  },
  "extensions": {
    "responseCache": {
      "hit": true
    }
  }
}
```

```js
import { createServer, GraphQLYogaError } from "@graphql-yoga/node";
import { useResponseCache } from "@envelop/response-cache";

type User = {
  id: string,
  name: string,
  isAdmin: boolean,
};

type Post = {
  id: string,
  title: string,
};

const users: User[] = [{ id: "jb", name: "Jamie Barton", isAdmin: true }];
const posts: Post[] = [{ id: "wtf", title: "Learn GraphQL" }];

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        users: [User]!
        posts: [Post]!
      }

      type Mutation {
        updateUser(id: ID!, name: String!): User
      }

      type User {
        id: ID!
        name: String!
        isAdmin: Boolean!
      }

      type Post {
        id: ID!
        title: String!
      }
    `,
    resolvers: {
      Query: {
        users: () => users,
        posts: () => posts,
      },
      Mutation: {
        updateUser: (_, { id, name }) => {
          const user = users.find((user) => user.id === id);

          if (!user) {
            throw new GraphQLYogaError("User not found");
          }

          user.name = name;
          return user;
        },
      },
    },
  },
  plugins: [
    useResponseCache({
      includeExtensionMetadata: true,
      // shouldCacheResult: ({ result }) => {
      //   return false;
      // },
      // ttl: 600,
      // ttlPerType: {
      //   Post: 1200,
      // },
    }),
  ],
});

server.start();
```
