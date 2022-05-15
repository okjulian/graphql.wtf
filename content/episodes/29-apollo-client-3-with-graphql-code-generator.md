---
title: Apollo Client 3 with GraphQL Code Generator
description: Automatically generate code for Apollo Client 3 hooks with GraphQL Code Generator using operations stored inside of your codebase.
published: 2022-02-14
video: https://www.youtube.com/watch?v=PYDGjTufGsk
repo: https://github.com/notrab/graphql.wtf-graphql-codegen-apollo-client
instructor: instructors/jamie-barton.md
---

- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [TypeScript React Apollo Plugin](https://www.graphql-code-generator.com/plugins/typescript-react-apollo)

```yaml
overwrite: true
schema: ${NEXT_PUBLIC_GRAPQL_ENDPOINT}
documents: "**/*.{gql,graphql}"
generates:
  ./graphql/generated/schema.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```
