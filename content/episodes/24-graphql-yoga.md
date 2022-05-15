---
title: GraphQL Yoga
description: Fully-featured GraphQL Server with focus on easy setup, performance and great developer experience.
published: 2022-01-10
video: https://www.youtube.com/watch?v=XAwkxSYgfMs
repo: https://github.com/notrab/graphql.wtf-graphql-yoga
instructor: instructors/jamie-barton.md
---

- [GraphQL Yoga](https://graphql-yoga.com)

```js
import { createServer } from "graphql-yoga";
import { useGraphQlJit } from "@envelop/graphql-jit";
import fetch from "node-fetch";

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: async () =>
      await fetch("http://localhost:1234/helloworld").then((res) => res.text()),
  },
};

const server = createServer({
  typeDefs,
  resolvers,
  plugins: [useGraphQlJit()],
  maskedErrors: true,
});

server.start(() => console.log("Server is running on localhost:4000"));
```

```js
import { createServer, createPubSub } from "graphql-yoga";

const pubSub = createPubSub();

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }

  type Mutation {
    speak(word: String!): String!
  }

  type Subscription {
    speaking: String!
  }
`;
```

```js
const resolvers = {
  Query: {
    hello: () => "World!",
  },
  Mutation: {
    speak: (_, { word }) => {
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
};
```
