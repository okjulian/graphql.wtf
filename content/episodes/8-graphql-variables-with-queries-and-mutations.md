---
title: GraphQL Variables with Queries and Mutations
description: Learn how to use GraphQL variables with your queries and mutations.
published: 2021-09-20
video: https://www.youtube.com/watch?v=PQvux9OAaBE
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphQL Variables](https://graphql.org/learn/queries/#variables)
- [CartQL API](https://api.cartql.com/)

```graphql
query getCartById($id: ID!) {
  cart(id: $id) {
    totalUniqueItems
    items {
      name
      unitTotal {
        amount
        formatted
        currency {
          code
        }
      }
    }
  }
}
```

```graphql
mutation AddToCartWithoutVariables {
  addItem(
    input: {
      cartId: "some-unique-id"
      id: "a-unique-id"
      name: "A product name"
      price: 1000
    }
  ) {
    id
    items {
      name
      unitTotal {
        formatted
      }
    }
  }
}
```

```graphql
mutation AddToCartWithSpecificVariables(
  $cartId: ID!
  $id: ID!
  $name: String!
  $price: Int!
) {
  addItem(input: { cartId: $cartId, id: $id, name: $name, price: $price }) {
    id
    items {
      name
      unitTotal {
        formatted
      }
    }
  }
}
```

```graphql
mutation AddToCartWithType($input: AddToCartInput!) {
  addItem(input: $input) {
    id
    items {
      name
      unitTotal {
        formatted
      }
    }
  }
}
```
