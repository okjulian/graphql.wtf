---
title: GraphQL Mesh as a Gateway
description: GraphQL Mesh acts as a proxy to your existing APIs, and gives you the ultimate developer control over how data is retrieved. It doesn't matter if your API is GraphQL, gRPC, Swagger, Postgres, and non-typed APIs.
published: 2021-08-02
video: https://www.youtube.com/watch?v=fhTg5wPU5LY
repo: https://github.com/notrab/graphql.wtf-graphql-mesh-as-a-gateway
instructor: instructors/jamie-barton.md
---

- [GraphQL Mesh](https://www.graphql-mesh.com)
- [The Guild](https://the-guild.dev)

```yaml
sources:
  - name: Countries
    handler:
      graphql:
        endpoint: https://countries.trevorblades.com
  - name: CartQL
    handler:
      graphql:
        endpoint: https://api.cartql.com
  - name: Stripe
    handler:
      openapi:
        source: https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json
        baseUrl: https://api.stripe.com
        operationHeaders:
          Authorization: "Bearer {env.STRIPE_SECRET_KEY}"
```

```json
{
  "scripts": {
    "build": "mesh build",
    "dev": "mesh dev",
    "start": "mesh start",
    "validate": "mesh validate"
  }
}
```
