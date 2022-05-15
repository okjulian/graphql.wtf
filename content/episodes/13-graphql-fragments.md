---
title: GraphQL Fragments
description: Learn how to work with GraphQL Fragments inside Queries and Mutations together with variables, and nested fragments.
published: 2021-10-25
video: https://www.youtube.com/watch?v=VY2kafBruEs
repo: null
instructor: instructors/jamie-barton.md
---

- `https://api.cartql.com`

```graphql
fragment currencyFields on Currency {
  code
  symbol
}

fragment moneyFields on Money {
  amount
  currency {
    ...currencyFields
  }
  formatted
}

fragment cartInfo on Cart {
  id
  totalItems
  totalUniqueItems
  items {
    id
    name
    quantity
    unitTotal {
      ...moneyFields
    }
    lineTotal {
      ...moneyFields
    }
  }
  subTotal {
    ...moneyFields
  }
}
```

```graphql
query getCartById($id: ID!) {
  cart(id: $id) {
    ...cartInfo
  }
}
```

```graphql
mutation addItem($cartId: ID!) {
  addItem(
    input: {
      cartId: $cartId
      id: "new-item-id"
      name: "New product"
      price: 1000
    }
  ) {
    ...cartInfo
  }
}
```
