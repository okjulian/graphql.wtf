---
title: Context with Response Cache Plugin
description: Enable or disable caching, and/or prevent leaking sensitive data with other users using the context argument for the Envelop plugin "Response Cache".
published: 2022-03-28
video: https://youtu.be/wsQ5ZwCQhF4
repo: https://github.com/notrab/graphql.wtf-response-cache-context
instructor: instructors/jamie-barton.md
---

- [Envelop](https://www.envelop.dev)
- [Response Cache Plugin](https://www.envelop.dev/plugins/use-response-cache)
- [GraphQL Yoga](https://graphql-yoga.com)

```ts
import { createServer, GraphQLYogaError } from "@graphql-yoga/node";
import { useResponseCache } from "@envelop/response-cache";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type Post = {
  id: string;
  title: string;
};

type Message = {
  userId: string;
  body: string;
};

const users: User[] = [
  { id: "1", name: "Jamie", isAdmin: true },
  { id: "2", name: "Laurin", isAdmin: false },
  { id: "3", name: "Uri", isAdmin: false },
];

const posts: Post[] = [{ id: "wtf", title: "Learn GraphQL" }];

const messages: Message[] = [
  { userId: users[0].id, body: "Hello" },
  { userId: users[0].id, body: "How's it going?" },
  { userId: users[1].id, body: "Did you see the last GraphQL WTF episode?" },
  { userId: users[2].id, body: "Did you see GraphQL Yoga 2?" },
];

const server = createServer<{
  user?: User;
}>({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        users: [User]!
        posts: [Post]!
        messages: [Message!]!
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

      type Message {
        user: User!
        body: String!
      }
    `,
    resolvers: {
      Query: {
        users: () => users,
        posts: () => posts,
        messages: (_, __, context) => {
          if (!context.user) {
            throw new GraphQLYogaError("User not authenticated");
          }

          return messages
            .filter((m) => m.userId === context.user?.id)
            .map(({ userId, ...message }) => ({
              user: users.find((user) => user.id === userId),
              ...message,
            }));
        },
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
  context: ({ request }) => {
    const userId = request.headers.get("authorization") ?? null;
    const user = users.find((user) => user.id === userId);

    return {
      user,
    };
  },
  plugins: [
    useResponseCache({
      session: (context) => String(context.user?.id),
      enabled: (context) => !context.user?.isAdmin,
      includeExtensionMetadata: true,
    }),
  ],
});

server.start();
```
