---
title: The Graph Client
description: Generate code automatically to query from the Ethereum network using The Graph Client.
published: 2022-06-06
video:
repo: https://github.com/graphqlwtf/episode-45-the-graph-client
instructor: instructors/jamie-barton.md
---

In this tutorial we'll learn how to use The Graph Client to query across the Ethereum network using The Graph, and connected subgraphs.

Let's begin by creating a new project and initializing NPM.

```bash
mkdir my-graph-client
cd my-graph-client
npm init -y
```

Then install the dependencies for TypeScript, and `ts-node`:

```bash
npm install ts-node
npm install --save-dev typescript @types/node
```

Finally, create the file `tsconfig.json` in the root of the project and add the following:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "module": "commonjs",
    "sourceMap": true,
    "lib": ["esnext", "DOM", "DOM.Iterable"],
    "allowSyntheticDefaultImports": true
  }
}
```

You can then update `package.json` to include the `start` script:

```json
{
  "scripts": {
    "start": "ts-node index.ts --transpileOnly"
  }
}
```

Now we're ready to go...

Let's begin by installing the Graph Client dependency:

```bash
npm install --save-dev @graphprotocol/client-cli
```

With this installed we can now create our config so Graph Client can successfully generate the SDK.

In the root of your project we'll need to create the following file:

```bash
touch .graphclientrc.yml
```

Here we can create our list of `sources` (subgraphs), and specify where our GraphQL queries will live.

We'll use the ENS Subgraph as a source example:

```yml
documents: "./graphql/*.{gql,graphql}"
sources:
  - name: ENS
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/ensdomains/ens
```

Now we can update `package.json` to include a script to run the graph client build command:

```json
{
  "scripts": {
    "codegen": "graphclient build"
  }
}
```

Next we'll create a GraphQL query that fetches registrations from the ENS subgraph.

```bash
mkdir graphql
touch graphql/GetLatestRegistrations.gql
```

Then inside `GetLatestRegistrations.gql` we can add the following named query:

```graphql
query GetLatestRegistrations {
  registrations {
    id
    expiryDate
    domain {
      name
    }
  }
}
```

If we now run the codegen script in our terminal we'll get an SDK we can use to execute that query.

```bash
npm run codegen
```

We should now see that we have a new directory, and files generated in the root of our project.

The folder `.graphclient` should look a little something like:

```bash
.graphclient
├── index.ts
├── schema.graphql
└── sources
    └── ENS
        ├── introspectionSchema.ts
        └── schema.graphql
```

Here we get all of our sources introspection results, as well as the schema. We also get `schema.graphql`, and `index.ts` generated automatically that contain everything we need to execute queries against the subgraphs.

Inside `index.ts` you should see some exports related to the query we wrote previously:

- `GetLatestRegistrationsQueryVariables`
- `GetLatestRegistrationsQuery`
- `GetLatestRegistrationsDocument`
- `GetLatestRegistrations` (inside the `getSdk` function)

Next let's explore the ENS subgraph by using `graphclient serve-dev`. Inside `package.json` add the following script:

```json
{
  "scripts": {
    "dev": "graphclient serve-dev"
  }
}
```

Then run it!

```bash
npm run dev
```

You should now see output that looks a little something like...

```bash
💡 🕸️  Mesh - Server Generating the unified schema...
💡 🕸️  Mesh Generating index file in TypeScript
💡 🕸️  Mesh - Server Serving Composed Graph: http://0.0.0.0:4000
💡 🕸️  Mesh Writing index.ts for CJS to the disk.
```

We should now be able to visit [`http://localhost:4000`](http://localhost:4000), explore GraphiQL docs, and execute queries.

If we take the query we had previously written in our `.graphql` file and run it here, we should see the results.

```graphql
query GetLatestRegistrations {
  registrations {
    id
    expiryDate
    domain {
      name
    }
  }
}
```

While it's fun to explore these queries inside GraphiQL, the real power of Graph Client comes when we want to run queries we generated above using the `codegen` script.

First, we'll create a new file:

```bash
touch index.ts
```

## Using the SDK

The `codegen` script we created earlier generated a ready to use SDK that allows us to execute queries, and pass any applicable variables to.

Inside `index.ts`, import `getBuiltGraphSDK` from the generated file `./graphclient/index.ts`:

```ts
import { getBuiltGraphSDK } from "./.graphclient";
```

Then we can get from `getBuiltGraphSDK` the function `GetLatestRegistrations`:

```ts
const { GetLatestRegistrations } = getBuiltGraphSDK();
```

Now all that's left to do is invoke the function `GetLatestRegistrations`, and fetch the `registrations` response from it!

```ts
async function main() {
  const { registrations } = await GetLatestRegistrations();

  console.log(registrations);
}

main().catch(console.error);
```

If you run this using `npm start` you will see in the console registrations fetched from the ENS Subgraph.

## Using the execute function

If you didn't want to execute the generated SDK function for queries, you can also use the `execute` function to perform an operation against the subgraphs.

We'll import both `execute` and `GetLatestRegistrationsDocument` from the generated `.graphclient`:

```ts
import { execute, GetLatestRegistrationsDocument } from "./.graphclient";
```

Next we'll call `execute` and pass 2 arguments, first `GetLatestRegistrationsDocument`, then `{}` for the variables:

```ts
import { execute, GetLatestRegistrationsDocument } from "./.graphclient";

async function main() {
  const { data } = await execute(GetLatestRegistrationsDocument, {});

  console.log(data);
}

main().catch(console.error);
```

That's it! We can use the generated `DocumentNode` to pass to `execute` to perform an operation anywhere we like. This is particularly useful if you want to execute a query on the frontend using a library such as [swr](https://swr.vercel.app).

## Adding Subgraphs

Most users working with The Graph will want to work with multiple subgraphs. You can update the `.graphclientrc.yml` and run the `codegen` script at any time.

Let's now add `uniswap` to our config:

```yml
sources:
  - name: ENS
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/ensdomains/ens
  - name: uniswapv2
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2

documents: "./graphql/*.{gql,graphql}"
```

Then run the `codegen` script:

```bash
npm run codegen
```

You will now see that the `.graphclient` folder contains more files than previously:

```bash
.graphclient
├── index.ts
├── schema.graphql
└── sources
    ├── ENS
    │   ├── introspectionSchema.ts
    │   └── schema.graphql
    └── uniswapv2
        ├── introspectionSchema.ts
        └── schema.graphql
```

You can then begin to explore this subgraph using GraphiQL, generate the SDK, and use the execute function to perform operations to the subgraphs you have configured.

You should now see inside of `.graphclient/index.ts` that we don't have any additional exports, aside from the updates to our schema. This is because we haven't created any "documents" (as referred to in our config). Once you add to the `./graphql` folder the queries, you will have the types, and SDK functions added to be used within your application.

## Conclusion

- The Graph provides a way for dapp developers to query across the network by using GraphQL with Subgraphs.
- Graph Client provides an intuitive easy to use client code generator that builds an SDK based on the GraphQL documents you have located amongst your code.
- Graph Client works server or client-side, and works seamlessly with frontend frameworks that provide support for static/server rendering, and more.
