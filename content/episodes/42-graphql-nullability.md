---
title: GraphQL Nullability
description: Learn how to define nullable and non-nullable fields your GraphQL schema with the schema-first approach.
published: 2022-05-15
video:
repo:
instructor: instructors/jamie-barton.md
---

The GraphQL type system has built-in support for null, and non-null fields. GraphQL is null by default.

Consider the following schema:

```graphql
type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}

type User {
  id: ID!
  name: String!
  favoriteNumber: Int
}

input CreateUserInput {
  name: String!
  favoriteNumber: Int
}
```

If you've worked with GraphQL before this probably looks very familiar. However there are a few things going on here that you should be aware of when designing your schema.

Let's break it down, line by line (or query by query).

```graphql
type Query {
  users: [User!]!
}
```

This `[User!]!` declaration tells GraphQL that the query `user` will always return a list, and no items in that list can be null.

We'll learn more about lists and non-null in another tutorial.

Next let's look at the query `user` that returns a `User`:

```graphql
type Query {
  user(id: ID!): User
}
```

You'll notice here that we have the argument `id` that is of non-null type `ID!`. This means you cannot query `user` without passing an `id`.

Let's take the following query example:

```graphql
{
  user {
    id
    name
  }
}
```

If you try to run this against the schema above it won't work, and GraphQL will tell you before it executes any resolver code.

```json
{
  "data": null,
  "errors": [
    {
      "message": "Field \"user\" argument \"id\" of type \"ID!\" is required, but it was not provided.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```

Next let's break down the `createUser` mutation:

```graphql
type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

This mutation has a non-null input argument `CreateUserInput!`, and the `createUser` mutation returns non-null `User!`.

The input type `CreateUserInput!` contains a non-null field `name`, and nullable `favoriteNumber` field.

This means if we ran the following mutation it would return an error:

```graphql
mutation {
  createUser(input: { favoriteNumber: 10 }) {
    id
    name
    favoriteNumber
  }
}
```

You can see here we aren't passing the non-null input argument field `name`. GraphQL will throw an error similar to:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Field \"CreateUserInput.name\" of required type \"String!\" was not provided.",
      "locations": [
        {
          "line": 2,
          "column": 21
        }
      ]
    }
  ]
}
```

If we explore the resolver for `createUser` you can see we return a new user object based on the `input` arguments (with a generated `id`):

```ts
const resolvers = {
  Mutation: {
    createUser: (_, { input: { name, favoriteNumber } }): User => ({
      id: String(Math.floor(Math.random() * 100)),
      name,
      favoriteNumber,
    }),
  },
};
```

Now let's see what happens if we update the `createUser` mutation to return `null`:

```ts
const resolvers = {
  Mutation: {
    createUser: () => null,
  },
};
```

Now if we execute the mutation with valid input arguments we'll still get an error:

```graphql
mutation {
  createUser(input: { name: "Jamie", favoriteNumber: 10 }) {
    id
    name
    favoriteNumber
  }
}
```

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Mutation.createUser.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["createUser"]
    }
  ],
  "data": null
}
```

Using non-null return types for mutations can be tricky. If something goes wrong and your resolver cannot continue, you should probably throw an error, or better return a custom [Error union type](/episodes/30-graphql-error-handling-with-union-types).

Next if we inspect the `User` type itself we'll see that we have some null, and non-null fields:

```graphql
type User {
  id: ID!
  name: String!
  favoriteNumber: Int
}
```

This means we can return inside our GraphQL resolvers something that looks like this:

```ts
type User = {
  id: string;
  name: string;
  favoriteNumber?: number;
};

const users: User[] = [
  {
    id: String(1),
    name: "Jamie Barton",
    favoriteNumber: Math.floor(Math.random() * 100),
  },
  {
    id: String(2),
    name: "Sophie Barton",
  },
];
```

You'll see that for the last user object that we don't have a `favoriteNumber` key/value.

Let's now execute the following query:

```graphql
{
  users {
    name
    id
    favoriteNumber
  }
}
```

We'll get the results without error, but `null` will be returned for `favoriteNumber` because we specify using `!` that the field is non-null.

```json
{
  "data": {
    "users": [
      {
        "name": "Jamie Barton",
        "id": "1",
        "favoriteNumber": 92
      },
      {
        "name": "Sophie Barton",
        "id": "2",
        "favoriteNumber": null
      }
    ]
  }
}
```

But if we updated our static `users` array to omit the `name` field we'd get an error when we try to execute the query:

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field User.name.",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ],
      "path": ["users", 0, "name"]
    }
  ],
  "data": null
}
```

One last thing to note is that if you're using TypeScript within your project, and combine it with things such as [Type safe resolvers](/episodes/26-type-safe-resolvers-with-graphql-code-generator) then you'll get immediate feedback in your code editor when the return type doesn't match that of the what's provided.

For example, in last example removing name, we'd get the following error in our console:

```bash
Type '{ id: string; favoriteNumber: number; } | { id: string; favoriteNumber?: undefined; }' is not assignable to type 'User'.
```

As you can clearly see, the type provided doesn't match that of the type `User` we declared in our app:

```ts
type User = {
  id: string;
  name: string;
  favoriteNumber?: number;
};
```
