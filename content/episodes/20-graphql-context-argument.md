---
title: GraphQL Context Argument
description: Learn how to use the context argument to share things like database connections, dataloaders, and more across requests.
published: 2021-12-13
video: https://youtu.be/JyY70ysZKbA
repo: null
instructor: instructors/jamie-barton.md
---

- [Root fields resolvers](https://graphql.org/learn/execution/#root-fields-resolvers)

```js
const resolvers = {
  Query: {
    me: (parent, args, context, info) => {
      return context.secretValue;
    },
  },
};
```

```js
app.use(
  "/graphql",
  graphqlHTTP((req) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Unauthorized");
    }

    const secretValue = secrets[authorization];

    return {
      schema,
      graphiql: {
        headerEditorEnabled: true,
      },
      context: {
        secretValue,
        startTime: Date.now(),
      },
      extensions: ({ context }) => ({
        runTime: Date.now() - context.startTime,
      }),
    };
  })
);
```
