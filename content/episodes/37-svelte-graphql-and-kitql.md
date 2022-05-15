---
title: Svelte, GraphQL, and KitQL
description: KitQL automatically generates Svelte stores for all of your GraphQL operations, and manages caching data between the client, and server. Optimistically update mutations with patching, and more.
published: 2022-04-11
video: https://www.youtube.com/watch?v=abOqT92SBIU
repo: https://github.com/notrab/graphql.wtf-kitql
instructor: instructors/jamie-barton.md
---

- [Svelte](https://kit.svelte.dev/)
- [KitQL](https://kitql.vercel.app)
- [KitQL Docs](https://kitql.vercel.app/docs/all-in)
- [CartQL](https://cartql.com)

```yml
schema: ${VITE_GRAPHQL_ENDPOINT}
documents: "**/*.{graphql,gql}"
generates:
  ./src/lib/graphql/_kitql/graphqlTypes.ts:
    plugins:
      - typescript
      - typescript-operations
      - typed-document-node
      - typescript-document-nodes
  ./src/lib/graphql/_kitql/graphqlStores.ts:
    plugins:
      - "@kitql/graphql-codegen"
    config:
      importBaseTypesFrom: $lib/graphql/_kitql/graphqlTypes
config:
  useTypeImports: true
```

```js
import { KitQLClient } from "@kitql/client";

const url = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export const kitQLClient = new KitQLClient({
  url,
  credentials: "omit",
  headersContentType: "application/json",
  logType: ["client", "server", "operationAndvariables"],
  // endpointSSRDelayMs: 500, // nice to demo delay in SSR mode
  // endpointNetworkDelayMs: 1000, // Nice to demo delay in Network mode
});
```

```js
const addToCart = async (input) => {
  const optimisticData = $KQL_GetCartById.data;
  optimisticData.cart.subTotal.formatted = "Refreshing";
  KQL_GetCartById.patch(
    optimisticData,
    {
      id: kitqlCartId,
    },
    "store-only"
  );

  const { data } = await KQL_AddToCart.mutate({
    variables: {
      input,
    },
  });

  KQL_GetCartById.patch(
    {
      cart: data.addItem,
    },
    {
      id: kitqlCartId,
    },
    "cache-and-store"
  );
};
```

```js
<script lang="ts">
  export let kitqlCartId: string;

  const removeFromCart = async (input) => {
    // patch with optimistic data
    const optimisticData = $KQL_GetCartById.data;
    optimisticData.cart.subTotal.formatted = `Removing items...`;
    KQL_GetCartById.patch(optimisticData, { id: kitqlCartId }, "store-only");

    // send mutation
    const { data } = await KQL_RemoveFromCart.mutate({
      variables: {
        input,
      },
    });

    // patch with real data
    KQL_GetCartById.patch(
      { cart: data.removeItem },
      { id: kitqlCartId },
      "cache-and-store"
    );
  };

  $: cart = $KQL_GetCartById.data?.cart;
</script>
```
