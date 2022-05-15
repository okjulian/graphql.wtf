---
title: Rename GraphQL fields with aliases
description: Rename fields in responses, and request the same field with different arguments as new fields with GraphQL aliases.
published: 2021-08-23
video: https://www.youtube.com/watch?v=GymKy9nkXFU
repo: null
instructor: instructors/jamie-barton.md
---

- [Learn Aliases](https://graphql.org/learn/queries/#aliases)
- [CartQL API](https://api.cartql.com/)

```graphql
{
  cart(id: "my-cart-id") {
    count: totalItems
    products: items {
      title: name
      created: createdAt
    }
  }

  cart2: cart(id: "abc") {
    id
    totalItems
  }
}
```

```graphql
mutation {
  addToCart: addItem(
    input: {
      cartId: "my-cart-id"
      id: "my-item-id"
      name: "GraphQL Stickers"
      price: 1000
    }
  ) {
    id
    items {
      title: name
      lineTotal {
        amount
        formatted
      }
    }
  }
}
```
