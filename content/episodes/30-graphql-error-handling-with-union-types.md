---
title: GraphQL Error Handling with Union Types
description: Implement better error handling with GraphQL by using the Type System.
published: 2022-02-21
video: https://youtu.be/AJOh-0Gdvt8
repo: https://github.com/notrab/graphql.wtf-error-handling-union-types
instructor: instructors/jamie-barton.md
---

The GraphQL Spec briefly discusses [error handling](https://spec.graphql.org/draft/#sec-Errors) in its simplest form for both requests, and field, but if you’re used to working with GraphQL for its awesome type system, you may feel wanting more handling errors in GraphQL.

If you’ve been working with GraphQL, and handling errors, you no doubt have had to do some fuzzy matching on errors to get what you need from the server, and present it to the user in a way that makes sense.

While presenting errors on the frontend as they are returned from the server works, you could potentially leak unwanted errors.

Thankfully server libraries like GraphQL Yoga enable maskedErrors by default. This prevents any “thrown” errors from leaking through to the frontend. But the generic error thrown by Yoga isn’t always useful to the frontend.

You’ve probably written resolver code before that looks something like this:

```js
const resolvers = {
  Query: {
    user: () => {
      // ...

      throw new Error("User not found");
    },
  },
};
```

Which would result in the following:

```json
{
  "errors": [
    {
      "message": "User not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["user"]
    }
  ],
  "data": null
}
```

If you were using the `maskedErrors` functionality from GraphQL Yoga, the response would look like:

```json
{
  "errors": [
    {
      "message": "Unexpected error.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["user"]
    }
  ],
  "data": null
}
```

While is arguably more secure, it's not very helpful for anyone implementing the GraphQL API and errors on the frontend.

There’s nothing in the error response that was thrown from the server to tell us anything more about the error. We got the message “User not found”, but if we wanted to distinguish errors on the frontend, we’d need some kind of `switch` statement to toggle through the errors.

Managing and sharing errors between the server and frontend just gets messy, real fast.

If you’ve worked with RESTful resources before, you’re probably used to things like the HTTP status code to help distinguish errors.

One way to provide additional details on the request error is by using `extensions`. If you’re using the GraphQL server library GraphQL Yoga, you can use the `GraphQLYogaError` class, and pass extension data in the 2nd argument to help enhance your error responses:

```js
import { GraphQLYogaError } from "@graphql-yoga/node";

const resolvers = {
  Query: {
    user: (_, { id }) => {
      // ...

      throw new GraphQLYogaError("User not found", { code: 404, userId: id });
    },
  },
};
```

The response now contains the `code` and `userId` that we can use to distinguish the right error alert to show.

If a user existed, but we didn’t have the correct permissions to query it, you could return the `code: 401` in the response.

While this works, it still leaves you having to `switch` between codes, and if any fields of the `User` fail to resolve, parsing the error can get even trickier having to guess what error to show.

A better way to work with errors in GraphQL is to use the built-in type system. Using the `extensions` feature is great, but it's not part of the schema also.

Let's look at the following SDL:

```graphql
type Mutation {
  login(input: LoginInput!): AuthPayload!
}

union AuthPayload =
    User
  | IncorrectCredentialsError
  | UserSuspendedError
  | UserBannedError

type User {
  id: ID!
  name: String!
}

interface Error {
  message: String!
}

type IncorrectCredentialsError implements Error {
  message: String!
}

type UserSuspendedError implements Error {
  message: String!
  unlockedAt: String!
}

type UserBannedError implements Error {
  message: String!
}

input LoginInput {
  email: String!
  password: String!
}
```

Here you can see we have several types for errors; `IncorrectCredentialsError`, `UserSuspendedError`, and `UserBannedError`.

All of these implement the `interface` `Error` since all of the errors share a common property `message`.

Now when we make a request, we can spread onto the different GraphQL types for our errors:

```graphql
mutation {
  login(input: { email: "jamie@graphql.wtf", password: "password" }) {
    __typename

    ... on User {
      id
      name
    }

    ... on Error {
      message
    }

    ... on UserSuspendedError {
      message
      unlockedAt
    }
  }
}
```

You'll notice we aren't spreading into the type `IncorrectCredentialsError`. This is because we are using the interface `Error`, so we can spread onto that instead. Only when we want to get additional fields on a specific error type do we need to do that.
