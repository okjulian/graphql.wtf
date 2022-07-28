---
title: Introduction
description: In this guide, you will set up tests that mock GraphQL responses in a type-safe way using NextJS, Jest, MSW and GraphQL Codegen.
published: 2022-08-01
video: https://youtu.be/MEfx26BXgpM
repo: https://github.com/okjulian/type-safe-graphql-mocks-msw
instructor: instructors/okjulian.md
---

When you're finished, you'll be able to have more confidence in your tests thanks to a typed mocking layer. By adding type safety to your GraphQL mocks, they will match the shape of the GraphQL queries. You won't worry about incorrect mocks in your tests. They will also be easier to write, since Typescript will guide you on what's missing in your fake data.

## Prerequisites

- [React](https://reactjs.org/) for components
- [NextJs](https://nextjs.org/) as a full-stack framework
- [GraphQL](https://graphql.org/) for the API layer
- [Typescript](https://www.typescriptlang.org/) for type checking
- [GraphQL Codegen](https://www.graphql-code-generator.com/) for type generation
- [Jest](https://jestjs.io/) for unit tests
- [MSW](https://mswjs.io/) for mocks
