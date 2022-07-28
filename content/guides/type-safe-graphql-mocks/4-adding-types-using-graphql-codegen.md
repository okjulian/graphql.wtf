---
title: Step 4 - Adding types using GraphQL Codegen
description: Remember the annoying `// @ts-ignore` in `pages/index.tsx`? That's because `useCart` is not type safe yet. Let's fix that using GraphQL Codegen.
published: 2022-08-01
video: https://youtu.be/WVy8r1Jd71M
repo: https://github.com/okjulian/type-safe-graphql-mocks-msw
instructor: instructors/okjulian.md
---

First, install `graphql` as a dependency.

```bash
yarn add graphql
```

Then install GraphQL Codegen CLI, along with the typescript and typescript-operations plugins. These two plugins will generate typescript types based on the GraphQL operations you have, along with your GraphQL schema.

```bash
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

Configure the generator by creating a file called `codegen.yml` and point it to your schema, operations and where to generate the types.

```yml
schema: https://api.cartql.com
documents: ./src/**/*.ts
generates:
  ./src/types.ts:
    plugins:
      - typescript
      - typescript-operations
```

To finish setting up Codegen, add a new script to `package.json` called `codegen` that calls `graphql-codegen`.

```json
{
  "scripts": {
    "codegen": "graphql-codegen"
  }
}
```

Now run the previous command to generate `src/types.ts`

```bash
yarn codegen
```

You will see a new file called `src/types.ts` in your project, containing types based on the CartQL schema and the `GetCartById` query you have exported in `src/getCartById.ts`.

Add the `getCartById` type to result of `useCart` inside `src/useCart.ts`

```ts
import { useEffect, useState } from "react";
import { getCartById } from "./GetCartById";

export function useCart(id: string) {
  const [cart, setCart] = useState();

  // ...

  return cart as unknown as GetCartByIdQuery["cart"];
}
```

Now you can finally remove `@ts-ignore` when accessing `cart?.totalItems` inside `pages/index.tsx`.

```tsx
import type { NextPage } from "next";
import { useCart } from "../src/useCart";

const Home: NextPage = () => {
  const cart = useCart("ck5r8d5b500003f5o2aif0v2b");
  return <div>Total items: {cart?.totalItems}</div>;
};

export default Home;
```

Thanks to GraphQL Codegen you leverage the GraphQL schema to generate types for your components, no need to manually recreate the API types in Typescript.

Besides using these types in your queries, another place where you can use them is in your mocks and tests. Let's see how to add them next.
