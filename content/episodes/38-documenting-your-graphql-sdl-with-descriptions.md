---
title: Documenting your GraphQL SDL with Descriptions
description: Add descriptions to your GraphQL schema to provide a better developer experience for consumers of your API. Descriptions also support markdown, so you format text, add links to further documentation, and more.
published: 2022-04-18
video: https://youtu.be/6m6ZIQXl-Vk
repo: https://github.com/notrab/graphql.wtf-sdl-descriptions
instructor: instructors/jamie-barton.md
---

- [GraphQL Specification](https://spec.graphql.org/draft/#sec-Descriptions)

Documenting APIs often plays a huge role in whether or not the API is a success amongst developers. APIs that are hard to use, navigate, and understand what each field does can be a huge turn off for acquiring new, or retaining existing users.

One of the things GraphQL ships with out of the box is the built-in introspection system. Using the types for queries, types, fields, arguments, directives, and more, GraphQL can automatically generate documentation. You'll often explore this documentation inside GraphiQL.

But documenting the queries, types, arguments, and other properties only gets us so far. Unless your API fields are named very descriptive, it's not always clear what each field represents.

Thankfully GraphQL has us covered the built-in `description` property. We can use this programmatically if building our schema with code, or in this example, we'll use string literals in our SDL:

```graphql
"""
Fetch data from the API using a given query.

You will need an [**API Key**](https://graphql.wtf) to get started!
"""
type Query {
  """
  Get all orders
  """
  orders(filter: OrderFilterInput): [Order!]!
}

"""
Get all orders made.
"""
type Order {
  """
  The unique ID of the order.
  """
  id: ID!

  """
  The order total in cents.
  """
  total: Int!

  """
  The order status, managed automatically.
  """
  status: OrderStatus!
}

"""
Each order is represented by a specific status.
"""
enum OrderStatus {
  """
  No money has been received.
  """
  UNPAID

  """
  Money has been received, and allocated to the order.
  """
  PAID

  """
  Money has been received, and returned to the customer.
  """
  CANCELLED
}

"""
Apply filters to orders using the following fields:
"""
input OrderFilterInput {
  """
  Filter by the order status
  """
  status: OrderStatus
}
```
