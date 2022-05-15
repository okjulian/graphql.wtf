---
title: GraphQL Yoga 2
description: It's time to relax with GraphQL Yoga. In this video we'll explore how easy it is to get started building a GraphQL Server with GraphQL Yoga. Featuring Subscriptions, Error Masking, and Plugins.
published: 2022-04-04
video: https://www.youtube.com/watch?v=_-B6QIFSSwo
repo: https://github.com/notrab/graphql.wtf-graphql-yoga-2
instructor: instructors/jamie-barton.md
---

- [GraphQL Yoga](https://graphql-yoga.com)

If you've been working with GraphQL long enough, you'll most likely know about GraphQL Yoga. It was created by Prisma (née Graphcool), but went stale after Prisma pivoted away from GraphQL.

Thankfully The Guild picked up GraphQL Yoga development, and released v2 built from the ground up that comes packed with support for Subscriptions, File Uploads, Error Masking, Apollo Federation, and more.

It's quick to get started with only a few lines of code to give you a fully functioning GraphQL server using `@graphql-yoga/node`:

```js
import { createServer } from "@graphql-yoga/node";

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello Hello Hello",
      },
    },
  },
});

server.start();
```

As you can see here we are declaring our own `hello` query by using `typeDefs`, and `resolvers`.

Error Masking is one of my new favourite features with GraphQL Yoga. No longer are you fuzzy matching errors thrown in your resolvers to decide on what's safe enough to be shown to your users. You can now import and use `GraphQLYogaError` to throw safe errors to your GraphQL Client, and all other errors will be caught by Yoga, sending a generic error back to the client instead.

Let's imagine we're looking for a user by ID of that we pass to the query arguments. If no user is found, we can safely return an error:

```js
const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        user(id: ID!): User!
      }
    `,
    resolvers: {
      Query: {
        user: async (_, args) => {
          const user = users.find((user) => user.id === args.id);

          if (!user) {
            throw new GraphQLYogaError(`User with id '${args.id}' not found.`);
          }

          return user;
        },
      },
    },
  },
});
```

In this video we build the following GraphQL Yoga server to demonstrate some of the features:

```js
import {
  createServer,
  createPubSub,
  GraphQLYogaError,
} from "@graphql-yoga/node";
import { useResponseCache } from "@envelop/response-cache";

const pubSub = createPubSub();

const server = createServer({
  plugins: [
    useResponseCache({
      includeExtensionMetadata: true,
    }),
  ],
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
      type Mutation {
        speak(word: String!): String!
      }
      type Subscription {
        speaking: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world!",
      },
      Mutation: {
        speak: (_, { word }) => {
          // throw new GraphQLYogaError("Something went wrong!");

          pubSub.publish("speak", word);

          return word;
        },
      },
      Subscription: {
        speaking: {
          subscribe: () => pubSub.subscribe("speak"),
          resolve: (payload) => payload,
        },
      },
    },
  },
});

server.start();
```
