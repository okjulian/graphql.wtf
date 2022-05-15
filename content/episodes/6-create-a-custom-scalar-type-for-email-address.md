---
title: Create a custom Scalar Type for Email Address
description: We'll create a custom GraphQL Scalar for our email that is rfc822 compliant.
published: 2021-09-06
video: https://www.youtube.com/watch?v=pOCMoTIYhJw
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphQL Scalar Docs](https://graphql.org/learn/schema/#scalar-types)
- [RFC #822](https://www.w3.org/Protocols/rfc822)

```js
const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validate = (value) => {
  if (typeof value !== "string") {
    throw new GraphQLError(`Value is not string: ${value}`);
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new GraphQLError(`Value is not a valid email address: ${value}`);
  }

  return value;
};
```

```js
const parseLiteral = (ast) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(
      `Query error: Can only parse strings as email addresses but got a: ${ast.kind}`
    );
  }

  return validate(ast.value);
};
```

```js
const GraphQLEmailAddressConfig = {
  name: "EmailAddress",
  description: "A valid email address",
  serialize: validate,
  parseValue: validate,
  parseLiteral,
};

const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAddressConfig);
```

```js
const typeDefs = `
  scalar EmailAddress
`;

const resolvers = {
  EmailAddress: GraphQLEmailAddress,
};
```
