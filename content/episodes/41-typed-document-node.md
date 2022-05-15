---
title: Typed Document Node
description: Generate a DocumentNode automatically for GraphQL operations, and the typescript signature it represents for better use with GraphQL clients.
published: 2022-05-09
video: https://youtu.be/cYIhx8dusa4
repo:
instructor: instructors/jamie-barton.md
---

You've probably used plugins to automatically generate the hooks for your GraphQL client with the [GraphQL Code Generator](https://www.graphql-code-generator.com), and the available [plugins](https://www.graphql-code-generator.com/plugins).

<FYI>
  I recommend watching this video on [GraphQL Code Generator with Apollo Client 3](/episodes/29-apollo-client-3-with-graphql-code-generator) to see the benefits of GraphQL Code Generator.
</FYI>

Plugins such as [`typescript-react-apollo`](https://www.graphql-code-generator.com/plugins/typescript-react-apollo), [`typescript-urql`](https://www.graphql-code-generator.com/plugins/typescript-urql), and [`typescript-graphql-request`](https://www.graphql-code-generator.com/plugins/typescript-graphql-request) generate a lot of boilerplate, and wrapper code that often goes unused. This boilerplate isn't always the easiest to use across GraphQL clients if you're working in a monorepo.

We'll explore using the [`typed-document-node`](https://www.graphql-code-generator.com/plugins/typed-document-node) plugin which aims to reduce this boilerplate by generating a `DocumentNode`. A `DocumentNode` is a GraphQL operation AST that can be used interchangable with any GraphQL client that supports it.

This reduces the need for generating client specific hooks with the GraphQL Code Generator, and instead use the client hooks directly with the generated `DocumentNode`.

Here's a snippet of the GraphQL schema we'll be using:

```graphql
type Query {
  cart(id: ID!): Cart!
}

type Cart {
  id: ID!
  totalItems: Int!
  isEmpty: Boolean!
  subTotal: Money!
}

type Money {
  formatted: String!
  amount: Int!
}
```

<FYI>

We'll be using the CartQL API throughout this schema for our example API &mdash; [View full schema](https://api.cartql.com).

</FYI>

Then inside of our project we can create `.graphql` files for our operations. Here is a query:

```graphql
query GetCartById($id: ID!) {
  cart(id: $id) {
    id
    totalItems
    subTotal {
      formatted
      amount
    }
  }
}
```

The `typed-document-node` plugin will generate types for the data, and variables for the GraphQL operation based on the query file above, once we install the plugin.

Now let's install [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started/installation):

```bash
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typed-document-node
```

You'll also want to install `graphql` itself, `cross-fetch`, and a GraphQL client library. We'll install 3 client libraries to see how this works with [`graphql-request`](https://github.com/prisma-labs/graphql-request), [`@apollo/client`](https://www.apollographql.com/docs/react/), and [`@urql/core`](https://formidable.com/open-source/urql/docs/basics/core/).

Inside your project install the following:

```bash
npm install graphql graphql-request @apollo/client @urql/core cross-fetch
```

Once these have been installed we'll next need to create a `codegen.yml` file, and add a script to our `package.json` to run it.

Inside a new file in the root of your project, create the file `codegen.yml` and add:

```yaml
overwrite: true
schema: https://api.cartql.com
documents: "**/*.graphql
generates:
  types.ts:
    plugins:
      - typescript
      - typescript-operations
      - typed-document-node
```

Here we are telling the GraphQL Code Generator to generate the file `types.ts` in the root of our project, and use the listed `plugins` against our schema. It will run these plugins for any document found in `**/*.graphql`.

Now inside of `package.json` within `scripts` add the following:

```json
{
  "codegen": "graphql-codegen"
}
```

Then run the script:

```bash
npm run codegen
```

Once completed, you should see a new file in the root of your project created called `types.ts`. Inside here you should see some code that was generated using the plugins we defined above. You'll see the types for our GraphQL types, and arguments.

You'll want to pay special attention to the following generated objects:

- `GetCartByIdDocument`
- `GetCartByIdQuery`
- `GetCartByIdQueryVariables`

Now that we have these generated, we can go ahead and use the `GetCartByIdDocument` "Node" with your GraphQL client.

## `@apollo/client`

We can import `@apollo/client` and pass it the generated `GetCartByIdDocument` without needing to codegen, or configure anything special. It just works, and it fully type-safe thanks to TypeScript generics.

```ts
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { GetCartByIdDocument } from "./types";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.cartql.com", fetch }),
  cache: new InMemoryCache(),
});

client
  .query({
    query: GetCartByIdDocument,
    variables: {
      id: "test",
    },
  })
  .then(({ data }) => console.log(data.cart));
```

## `@urql/core`

Finally with urql we can do the same by importing the `DocumentNode`, and use it to make a request. The generics inside of the generated type document node make it easy to work with the response, and variables.

```ts
import fetch from "cross-fetch";
import { createClient } from "@urql/core";

import { GetCartByIdDocument } from "./types";

const client = createClient({
  url: "https://api.cartql.com",
  fetch,
});

client
  .query(GetCartByIdDocument, {
    id: "test",
  })
  .toPromise()
  .then(({ data }) => console.log(data.cart));
```

## `graphql-request`

Even if your GraphQL client doesn't fully support DocumentNode, in the case with `graphql-request`, you often pass to the request generics the shape of your data, and variables.

Let's import `graphql-request`, `cross-fetch` and instantiate a new `GraphQLClient` that we can use to send GraphQL operations to.

```ts
import fetch from "cross-fetch";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://api.cartql.com", { fetch });
```

Then we'll want to import our generated objects shown above:

```ts
import {
  GetCartByIdDocument,
  GetCartByIdQuery,
  GetCartByIdQueryVariables,
} from "./types";
```

Then to use this with `graphql-request`, we invoke `client.request` and pass it our `GetCartByIdQuery`, and `GetCartByIdQueryVariables` as generics.

Then pass the `GetCartByIdDocument` as the first argument, and the variables for the second:

```ts
client
  .request<GetCartByIdQuery, GetCartByIdQueryVariables>(GetCartByIdDocument, {
    id: "test",
  })
  .then(({ cart }) => console.log(cart));
```

## Conclusion

- Typed Document Node gives you the ability to change your GraphQL client without having to reconfigure codegen, or install additional tools.
- Typed Document Node reduces the boilerplate types generated for the typical `useQuery`, `useMutation` hooks that GraphQL Code Generator creates.
- Typed Document Node uses generics to send the shape of the data, and variables that gives a greater developer experience when working with responses.
