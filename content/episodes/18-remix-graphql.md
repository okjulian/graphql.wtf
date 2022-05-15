---
title: Remix + GraphQL Request
description: Discover how to fetch data on the server with Remix loaders, and link between pages using the Remix Web Framework.
published: 2021-11-29
video: https://www.youtube.com/watch?v=F5rGkgHgAog
repo: https://github.com/notrab/graphql.wtf-remix-graphql
instructor: instructors/jamie-barton.md
---

- [Remix](https://remix.run)
- [`graphql-request`](https://github.com/prisma-labs/graphql-request)

```js
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://countries.trevorblades.com");
```

```js
import { useLoaderData, json, Link } from "remix";
import { gql } from "graphql-request";

import { client } from "~/lib/graphql-client";

const GetAllCountries = gql`
  {
    countries {
      name
      code
    }
  }
`;

export let loader = async () => {
  const { countries } = await client.request(GetAllCountries);

  return json({ countries });
};

export let meta = () => {
  return {
    title: "GraphQL + Remix",
    description: "WTF is GraphQL?",
  };
};

export default function Index() {
  let { countries } = useLoaderData();

  return (
    <div>
      <h1>Remix + GraphQL!</h1>

      <ul>
        {countries.map(({ code, name }) => (
          <li key={code}>
            <Link to={`/countries/${code}`} prefetch="intent">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```js
import { useLoaderData, json, redirect } from "remix";
import { gql } from "graphql-request";

import { client } from "~/lib/graphql-client";

const GetCountryByCode = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
    }
  }
`;

export let loader = async ({ params }) => {
  const { code } = params;

  const { country } = await client.request(GetCountryByCode, {
    code,
  });

  return json({ country });
};

export let action = async ({ request }) => {
  let { code } = await request.formData();

  redirect(`/countries/${code}`);
};

export default function CountryPage() {
  let { country } = useLoaderData();

  return (
    <>
      <form method="post" action={`/countries/${country.code}`}>
        <label>
          <input name="code" type="text" placeholder="Country code" />
        </label>
        <button type="submit">Go</button>
      </form>
      <pre>{JSON.stringify(country, null, 2)}</pre>
    </>
  );
}
```
