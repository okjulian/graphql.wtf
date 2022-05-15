---
title: Authorization with GraphQL Shield
description: In this video we’ll explore some of the logic and input rules that come with GraphQL Shield to protect against unwanted requests.
published: 2021-08-16
video: https://www.youtube.com/watch?v=DvjRCnrYFcg
repo: https://github.com/notrab/graphql.wtf-graphql-shield
instructor: instructors/jamie-barton.md
---

- [GraphQL Shield](https://www.graphql-shield.com)
- [Rules](https://www.graphql-shield.com/docs/rules)
- [API Reference](https://www.graphql-shield.com/docs/advanced/reference)

```js
const { applyMiddleware } = require("graphql-middleware");

const schemaWithPermissions = applyMiddleware(schema, permissions);
```

```js
const { shield, rule, and, inputRule, deny } = require("graphql-shield");

const permissions = shield({
  Query: {
    "*": deny,
    users: and(isAuthenticated, isAdmin),
    me: isAuthenticated,
  },
  Mutation: {
    createUser: isNotAlreadyRegistered,
  },
});
```

```js
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return !!ctx.headers["user-id"];
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const user = users.find(({ id }) => id === ctx.headers["user-id"]);

  return user && user.role === "ADMIN";
});

const isNotAlreadyRegistered = inputRule()((yup) =>
  yup.object({
    input: yup.object({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
        .notOneOf(
          users.map(({ email }) => email),
          "A user exists with this email. Choose another."
        ),
    }),
  })
);
```
