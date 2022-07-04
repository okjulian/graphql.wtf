---
title: Generate TypeScript Types from GraphQL
description: Automatically generate types for your local or remote GraphQL schema, and operations for better type-safety.
published: 2022-07-04
video: https://youtu.be/Ob3MRkgQdcc
repo: https://github.com/graphqlwtf/episode-49-typescript-types-for-graphql/blob/main/codegen.yml
instructor: instructors/jamie-barton.md
---

We've discussed working with the GraphQL Code Generator before, but let's go back to basics. In this tutorial we'll learn how to automatically generate TypeScript types for our GraphQL schema, and operations.

To get started you'll want to install the GraphQL Code Generator CLI:

```bash
npm install --save-dev @graphql-codegen/cli
```

Now using `npx` we can run the initializer:

```bash
npx graphql-codegen init
```

This will then ask us about our project, and what exactly features of GraphQL Code Generator we want to use.

Once complete you should now have a file inside of your project directly with the name you specified for the config file. By default this will be called `codegen.yml`:

```yml
overwrite: true
schema: https://api.cartql.com
documents: "./graphql/**/*.{gql,graphql}"
generates:
  types.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
```

With this we can install install the dependencies added to the `package.json`, as well as the `codegen` script:

```bash
npm install
npm run codegen
```

You should now see inside of your project directly you have the file `types.ts` (or whatever you named it) that contain all of the types for the API you specified.

That's it! You're ready to add GraphQL operations to the directory you specified, and generate the TypeScript types.
