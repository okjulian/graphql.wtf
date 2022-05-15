---
title: GraphQL Caching with GraphCDN
description: Make your GraphQL API faster with caching using GraphCDN. Monitor API health with error monitoring, and alerts, as well as analytics for operations made to your endpoint.
published: 2022-03-07
video: https://www.youtube.com/watch?v=iMJmsAzjA9A
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphCDN](https://graphcdn.io)
- [GraphCDN Docs](https://docs.graphcdn.io/docs)
- [GraphCDN Changelog](https://feedback.graphcdn.io/changelog)

- `https://cartql.graphcdn.app`

```graphql
query {
  cart(id: "graphcdn") {
    id
    totalItems
    items {
      id
      name
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
    }
    grandTotal {
      amount
      formatted
    }
  }
}
```

```graphql
mutation {
  addItem(
    input: {
      cartId: "graphcdn"
      id: "item-id-1"
      name: "GraphCDN T-Shirt"
      description: "As worn by Max"
      images: ["graphcdn-tee-white-front.png", "graphcdn-tee-white-back.png"]
      price: 1590
    }
  ) {
    id
    isEmpty
    abandoned
    totalItems
    totalUniqueItems
    items {
      id
      name
      quantity
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
    }
    subTotal {
      formatted
    }
  }
}
```
