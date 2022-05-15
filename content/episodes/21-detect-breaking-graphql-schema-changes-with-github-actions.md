---
title: Detect breaking GraphQL schema changes with GitHub Actions
description: Learn how to configure a GitHub Action to automatically detect breaking schema changes when new Pull Requests are opened.
published: 2021-12-20
video: https://www.youtube.com/watch?v=snFHrYEnCqo
repo: https://github.com/notrab/graphql.wtf-graphql-inspector
instructor: instructors/jamie-barton.md
---

- [GraphQL Inspector docs](https://graphql-inspector.com/docs/products/action)

```yml
name: GraphQL Inspector

on: [push]

jobs:
  test:
    name: Check Schema
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - uses: kamilkisiela/graphql-inspector@master
        with:
          schema: "main:schema.graphql"
```

```json
{
  "validate": "graphql-inspector validate ./query.graphql ./schema.graphql"
}
```
