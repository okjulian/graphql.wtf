---
title: GraphQL Subscriptions with Server Sent Events
description: Learn how to subscribe, and post to PubSub topics using GraphQL Subscriptions, Server Sent Events, and GraphQL Yoga.
published: 2022-07-25
video: https://youtu.be/oZtTut7QsZ8
repo: https://github.com/graphqlwtf/episode-52-graphql-subscriptions-with-server-sent-events
instructor: instructors/jamie-barton.md
---

GraphQL Subscriptions lays the foundations to subscribe to data changes. Subscriptions are great for knowing what, and why data changed. If you're working with real-time data such as a chat application or notification then GraphQL Subscriptions will get you quite far.

GraphQL Subscriptions are often used via WebSockets, but we'll leave that for another lesson. Today we'll explore using [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) which comes as the default transport mechanism with GraphQL Yoga.

Let's take the following GraphQL schema:

```graphql
type Query {
  room(id: ID!): [Message!]!
}

type Mutation {
  send(input: SendMessageInput!): Message!
}

type Subscription {
  newMessage(roomId: ID!): Message!
}

type Message {
  from: String
  body: String
}

input SendMessageInput {
  roomId: ID!
  from: String!
  body: String!
}
```

This schema lets you view messages from a room, and subscribe to new messages via the `newMessage` subscription. To send messages we'll use the `send` mutation.

Next, we'll import our schema, and instantiate a new GraphQL Yoga server in Node:

```ts
import { createServer } from "@graphql-yoga/node";
import * as fs from "fs";
import * as path from "path";

import { Resolvers } from "./types";

const typeDefs = fs.readFileSync(path.join(process.cwd(), "schema.graphql"), {
  encoding: "utf-8",
});

const resolvers: Resolvers = {
  Query: {
    room: () => [],
  },
  Mutation: {
    send: (_, { input }) => {
      const { roomId, ...newMessage } = input;

      return newMessage;
    },
  },
  Subscription: {},
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start();
```

We're also using the [GraphQL Code Generator](https://www.graphql-code-generator.com) to generate types for our resolvers. We cover this in [episode 26](/episodes/26-type-safe-resolvers-with-graphql-code-generator).

Right now our server won't do much. Our `send` mutation will return the `newMessage` from our `input` argument to satisfy the GraphQL schema.

Let's begin by importing `createPubSub` from `@graphql-yoga/node`:

```ts
import { createPubSub } from "@graphql-yoga/node";
```

With this we can instantiate a new pubsub bus:

```ts
const pubSub = createPubSub();
```

Since we'll be watching for new messages per channel, let's use a specific topic, and provide this as a generic to `createPubSub`:

```ts
const pubSub = createPubSub<{
  newMessage: [payload: { from: string; body: string }];
}>();
```

The `payload` here is of a specific type. In this case we'll match the `Message` type.

Now that we have our `pubSub` instantiated we can add this to our server context:

```ts
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: {
    pubSub,
  },
});
```

Next inside of our mutation resolver for `send` we'll publish a new message to the topic `newMessage`, passing along the `roomId`, and message using positional arguments:

```ts
const resolvers: Resolvers = {
  // ...
  Mutation: {
    send: (_, { input }, { pubSub }) => {
      const { roomId, ...newMessage } = input;

      pubSub.publish("newMessage", roomId, newMessage);

      return newMessage;
    },
  },
  // ...
};
```

You'll notice we fetch `pubSub` from our server context argument.

Now when we send a message it will publish a new message to the topic with the provided `roomId`.

Finally, we need to subscribe to the specific topic. Inside of our `Subscription` resolver we'll define `newMessage`:

```ts
const resolvers: Resolvers = {
  // ...
  Subscription: {
    newMessage: {
      // ...
    },
  },
};
```

The subscription resolver works similar to how a regular works. We have access to the same arguments you would in a query and resolver. Let's fetch `roomId` from our args, and `pubSub` from context for the function `subscribe`:

```ts
const resolvers: Resolvers = {
  // ...
  Subscription: {
    newMessage: {
      subscribe: (_, { roomId }, { pubSub }) => {
        // ...
      },
    },
  },
};
```

Now all that's left to do is `subscribe` to our `pubSub` on the `newMessage` topic with our dynamic `roomId`. Let's also provide the `resolve` function that simply returns our payload "as is":

```ts
const resolvers: Resolvers = {
  // ...
  Subscription: {
    newMessage: {
      subscribe: (_, { roomId }, { pubSub }) =>
        pubSub.subscribe("newMessage", roomId),
      resolve: (payload) => payload,
    },
  },
};
```

That's it! You should now be able to subscribe to the `newMessage` topic, and `send` messages from another GraphQL request.

Using GraphiQL we can subscribe to the room with ID `1`:

```graphql
subscription {
  newMessage(roomId: "1") {
    from
    body
  }
}
```

Then inside another GraphiQL we can send a new message to the same room:

```graphql
mutation {
  send(input: { roomId: "1", from: "Jamie", body: "Hello Yoga!" }) {
    from
    body
  }
}
```

You should see that the subscription returns the message sent in the other window.

If you change the `roomId` to `2` and resend the mutation, nothing will appear in the subscription. This is because it's only subscribed to messages on the topic provided in the subscription.

## Conclusion

- GraphQL Yoga uses Server Sent Events by default, but has some limitations.
- GraphQL Subscriptions also work with WebSockets, but can lead to complexity on the frontend.
- This works great in development, but you'll want to use something like MQTT or Redis in production to persist messages and topics between connected clients. We'll cover these in another lesson.
