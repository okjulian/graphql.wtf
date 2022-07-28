---
title: Step 1 - Displaying cart items
description: In this step you're going to display cart items in the browser. To do this, you will setup a NextJs application and fetch cart items from a GraphQL API.
published: 2022-08-01
video: https://youtu.be/aLgX31wYJDw
repo: https://github.com/okjulian/type-safe-graphql-mocks-msw
instructor: instructors/okjulian.md
---

First, bootstrap a new NextJs and Typescript application.

```bash
yarn create next-app --typescript type-safe-graphql-mocks-msw
```

The last argument specifies the folder where the application will be created.

Now go to the created folder and start the app in development mode.

```bash
cd type-safe-graphql-mocks-msw
yarn dev
```

You'll see the page running in [http://localhost:3000](http://localhost:3000).

Next, create a top level folder and name it `src`. This is where our components and helpers will be located.

Now create a file inside `src` called `GetCartById.ts`. Export a string containing a query to fetch a cart by id from [https://cartql.com](https://cartql.com).

```ts
export const getCartById = `
  query GetCartById($id: ID!) {
    cart(id: $id) {
      totalItems
      subTotal {
        amount
        formatted
      }
      items {
        id
        name
        quantity
        unitTotal {
          formatted
        }
      }
    }
  }
`;
```

Next you're going to define a new React hook to fetch the cart. Create a new file inside `src` and name it `useCart.ts`.

It exports a function called `useCart` that receives an `id` and returns a `cart`, `null` or `undefined`.

```ts
import { useEffect, useState } from "react";
import { getCartById } from "./GetCartById";

export function useCart(id: string) {
  const [cart, setCart] = useState();

  const variables = {
    id,
  };

  const body = JSON.stringify({ query: getCartById, variables });

  useEffect(() => {
    fetch("https://api.cartql.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setCart(data.cart);
      });
  }, [body, setCart]);

  return cart;
}
```

Notice that to communicate with the GraphQL API, it uses a simple `fetch` call that sends a query and some variables. Depending on the needs of your application, you would use more elaborate ways of communicating with your API such as [React Query](https://tanstack.com/query/v4/), [Apollo Client](https://www.apollographql.com/docs/react/) or others.

Finally, display the total items in `pages/index.tsx`:

```tsx
import type { NextPage } from "next";
import { useCart } from "../src/useCart";

const Home: NextPage = () => {
  const cart = useCart("ck5r8d5b500003f5o2aif0v2b");
  // @ts-ignore
  return <div>Total items: {cart?.totalItems}</div>;
};

export default Home;
```

Don't freak out about that last `// @ts-ignore`, you will fix that once you add types for the GraphQL API.

In this step, you setup a simple NextJs application that fetches a cart by id. Next step is creating a unit test that verifies this page correctly displays the total items.
