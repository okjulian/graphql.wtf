---
title: Step 2 - Testing cart items page
description: In this step you're going to setup Jest to test NextJs pages, and then write a test to verify the functionality of the cart page.
published: 2022-08-01
video: https://youtu.be/Fhsn5FZz_KM
repo: https://github.com/okjulian/type-safe-graphql-mocks-msw
instructor: instructors/okjulian.md
---

First install Jest, React testing library and a fetch library that works on the testing environment.

```bash
yarn add @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom whatwg-fetch -D
```

Next, define Jest configuration by creating a file called `jest.config.js` and add the following:

```js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {},
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

Create another file called `jest.setup.js` that sets up both React Testing Library and a fetch replacement for the test environment.

```js
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
```

To finish setting up testing, add a new command to `package.json` called `test` that calls `jest --watchAll`.

Now that tests are set up, you can write a test to verify the functionality of the cart page.

Create a folder called `__tests__` and add a new test called `index.test.tsx`.

This test will render the cart page and verify it displays `Total items:`.

```tsx
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders total items", () => {
    render(<Home />);

    const totalItems = screen.getByText("Total items:");

    expect(totalItems).toBeInTheDocument();
  });
});
```

Run the test to verify it passes.

```bash
yarn test
```

Notice that the component this test rendered sends an HTTP request to the GraphQL API right after it renders. In the next step you are going to mock this interaction using a library called [MSW](https://mswjs.io).
