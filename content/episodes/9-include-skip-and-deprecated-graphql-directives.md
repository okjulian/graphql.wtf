---
title: include, skip and deprecated GraphQL Directives
description: Learn how to work with @include, @skip, and @deprecated built-in GraphQL directives.
published: 2021-09-27
video: https://www.youtube.com/watch?v=hdrKqFStlkc
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphQL Spec (working draft)](https://spec.graphql.org/draft/#sec-Language.Directives)
- [`specifiedBy` proposal](https://github.com/graphql/graphql-spec/issues/635)

```graphql
query getUsers($showName: Boolean) {
  users {
    id
    name @include(if: $showName)
  }
}
```

```graphql
query getUsers($showName: Boolean = true) {
  users {
    id
    name @include(if: $showName)
  }
}
```

```graphql
query getUsers($hideName: Boolean) {
  users {
    id
    name @skip(if: $hideName)
  }
}
```

```graphql
query getUsers($excludeFields: Boolean) {
  users {
    id
    ... on User @skip(if: $excludeFields) {
      name
      email
      role
    }
  }
}
```

```graphql
fragment User on User {
  name
  email
  role
}

query getUsers($excludeFields: Boolean) {
  users {
    id
    ...User @skip(if: $excludeFields)
  }
}
```

```graphql
type User {
  id: ID!
  title: String @deprecated(reason: "Use name instead")
  name: String!
  email: String!
  role: Role
}
```

```graphql
fragment User on User {
  title @include(if: $includeDeprecatedFields)
  name
  email
  role
}

query getUsers($includeDeprecatedFields: Boolean! = false) {
  users {
    id
    ...User
  }
}
```
