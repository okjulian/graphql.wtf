---
title: Step 3 - Mocking GraphQL query inside test using MSW
description: In this step you will add a library to your test that intercepts requests and returns mock results. This results in faster and more robust tests. Faster because you cut out the slowest link in this setup, the network. More robust because you get consistent API responses.
published: 2022-08-01
video: https://youtu.be/zJsqxGYPzxc
repo: https://github.com/okjulian/type-safe-graphql-mocks-msw
instructor: instructors/okjulian.md
---

First, you will install the MSW library. MSW stands for Mock Service Workers, and it allows you to intercept network calls and replace its responses with mock data.

```bash
yarn add msw --dev
```

Next, you will setup a matcher for the `GetCartById` query that returns a fixed response whenever it intercepts a GraphQL query with that name.

```ts
// ...
const server = setupServer(
  graphql.query("GetCartById", (req, res, ctx) => {
    return res(
      ctx.data({
        cart: { totalItems: 10 },
      })
    );
  })
);
// ...
```

Now that the page under test receives the same value for `cart.totalItems`, you will change the expected test to be `Total items: 10`.

```ts
const totalItems = await waitFor(() => screen.getByText("Total items: 10"));
```

Notice the use of the `waitFor` utility from React Testing Library. It waits for a specific condition to be met before returning the element. This means the test will wait until the mocked API result exists.

This is what `index.test.tsx` looks like now:

```ts
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { graphql } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  graphql.query("GetCartById", (req, res, ctx) => {
    return res(
      ctx.data({
        cart: { totalItems: 10 },
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Home", () => {
  it("renders total items", async () => {
    render(<Home />);

    const totalItems = await waitFor(() => screen.getByText("Total items: 10"));

    expect(totalItems).toBeInTheDocument();
  });
});
```

You added mocks for the GraphQL query to your test using MSW. The first step before having type safe mocks is having types, which is what you're going to do next.
