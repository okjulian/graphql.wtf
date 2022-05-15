---
title: GraphQL Mutations and Input Types
description: Avoid bloating mutations with arguments, and instead opt to use input types you can extend over time. Explore naming conventions for input types, how to define them, and use them with variables.
published: 2022-04-25
video: https://www.youtube.com/watch?v=YB0q1WshdLw
repo: null
instructor: instructors/jamie-barton.md
---

Mutations in GraphQL can look very different from one API to another. If you're inserting, updating, or performing any GraphQL operations that change data, you'll want to use a `mutation`.

Since both queries, and mutations accept arguments, you've probably used a `mutation` that looks similar to:

```graphql
mutation AddToCart($id: ID!, $name: String!, $price: Int!, $quantity: Int = 1) {
  AddToCart(id: $id, name: $name, price: $price, quantity: $quantity) {
    subTotal
    items {
      name
      price
      quantity
    }
  }
}
```

While this works, and is accepted by GraphQL executing the mutation, it often makes more sense to create a dedicated input type for mutations that accept user data that will be processed, and stored elsewhere.

Input Types provide the same level of validation, and provide you type safe inputs for the data you're sending to your back. Of course you will validate this server side, but you can leverage GraphQL to validate before it executes that a field expecting a `String` is in fact a `String`.

Let's consider the following mutation for adding items to a cart:

```graphql
addToCart(input: AddToCartInput!): Cart!
```

Here we provide the argument name `input`, and then pass it a special type `AddToCartInput` that is non-null (`!`).

While `AddToCartInput` doesn't look special just by its name, it is infact prefixed with `input` within the SDL:

```graphql
input AddToCartInput {
  id: ID!
  name: String!
  price: Int
  quantity: Int! = 1
}
```

You'll notice a that the typename itself is appended with `Input`. This is a common practice amongst developers implementing Input Types.

You can also see that the `AddToCartInput` type defines fields as non-null. So if you attempt to pass an object with a missing field then GraphQL will tell you.

If you wanted to allow users to update items in their cart, you could declare an Input Type with fields that can be null, because the item already exists, they can just provide fields they want to update:

```graphql
input UpdateCartItemInput {
  name: String
  price: Int
  quantity: Int
}
```

A limitation of using Input Types is that they must be of a set structure. You can't work with them like you can Union Types. Fields you send in an mutation must match the shape of the type you defined.

A workaround for this would be to create an extended input type with nullable fields that you can then pluck inside the resolver, but you won't get the validation benefits that GraphQL provides using types as they were intended (non-null/null explicitly defined).

There is currently an RFC for [`OneOf` Input Objects](https://github.com/graphql/graphql-spec/pull/825) that you will want to subscribe to.

You can learn more about Input Types [here](https://graphql.org/learn/schema/#input-types).
