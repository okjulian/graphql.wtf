---
title: Schema-first or code-first GraphQL
description: Getting started with GraphQL doesn't always mean you need to write your schema by hand. Instead you can use code-first tools to define both your type definitions and resolvers.
published: 2022-05-23
video: https://youtu.be/6VTeNpNHgGc
repo:
instructor: instructors/jamie-barton.md
---

When GraphQL, and it's accompanying reference implementation [`graphql-js`](https://github.com/graphql/graphql-js) were first introduced, building schemas with code by composing classes and functions was the norm. We'd write some code, and it would output an executable schema without having to manually write the SDL.

<FYI>

The `graphql-js` package is at the core of many popular GraphQL server frameworks, including [GraphQL Yoga](/epsiodes/36-graphql-yoga-2), and Apollo Server.

</FYI>

If you're unfamiliar with `graphql-js`, here is what it looks like to create a query `hello` that returns `world`:

```js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
  }),
});
```

Then [Graphql Tools](https://www.graphql-tools.com) was introduced that gave us the ability to define a schema using SDL (Schema Definition Language) which is today known as a "schema-first".

<FYI>

You'll probably hear the term "sdl-first" used. This basically means "schema-first", and probably better fits since both approaches output a `GraphQLSchema`.

</FYI>

Here's what the same schema above looks but this time with `@graphql-tools/schema`:

```js
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

After the launch of GraphQL Tools, SDL-first soon became a popular way to define schemas. You can see from both examples that SDL-first appears to be more appealing because you write less verbose code to generate a schema, connect resolvers, and make executable.

SDL-first remains a popular choice today, and this is due to most of the "getting started" tutorials for almost every GraphQL server framework uses it.

---

If we wanted to expand on our SDL we can update our `typeDefs` value to include some new types, and write those using the SDL:

```js
const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    favoriteNumber: Int!
    friends: [User!]!
  }
`;
```

Here we've added a new query that returns a list of non-null users, and created a `User` type that has non-nullable fields, and a reference to itself. You can learn more about GraphQL nullability in [Episode 42](/episodes/42-graphql-nullability).

Then all we need to do now is add a resolver to return the `users` query like we did with our `hello` resolver, and we have a functioning GraphQL API.

If we were to do this with the code-first approach, it would result in a lot more code required since we can type our schema as text. This is why SDL-first is often favored.

Since both the schema and resolvers must match in order to work, it's very easy to get these out of sync, or create bugs. Not only due to the lack of types, but as a schema grows, it gets more difficult to maintain.

There are tools such as [GraphQL Code Generator](https://www.graphql-code-generator.com/) that can creates types automatically from the SDL, but this can lead to complexity of your server setup when you grow, and use libraries like [GraphQL Modules](https://www.graphql-modules.com/).

---

Let's now look at an example of [Pothos](https://www.pothos-graphql.dev) for building code-first schemas:

```js
import { createServer } from "@graphql-yoga/node";
import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || "World"}`,
    }),
  }),
});

const server = createServer({
  schema: builder.toSchema({}),
});

server.start();
```

Here the code is a little less verbose, and comes fully typed. This enables faster development out of the box without having to configure additional libraries watch, and generate code.

## Conclusion

Both approaches work, but one requires more setup than the other when you need to scale your application. SDL-first is great for getting started, and has a lot of benefits when building schemas, but so does code-first libraries such as [Pothos](https://www.pothos-graphql.dev), and [Nexus](https://nexusjs.org).

I'd suggest using what works for you. If you don't mind managing all of the different libraries, code generation scripts, and boilerplate then SDL-first is easier on the eye.

If you're new to GraphQL, you'll most likely see every example using SDL-first (I know I'm guilty of this,) so even if you do go with code-first, make sure you have an understanding of the GraphQL SDL both generate.

Finally, GraphQL isn't just a JavaScript thing. Many languages have their own tooling, and libraries to build GraphQL schemas. If you're exploring GraphQL for the first time, you can continue to use what language and tooling you already know.
