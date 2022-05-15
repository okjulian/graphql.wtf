---
title: Type safe GraphQL queries with genql
description: Write type safe GraphQL queries with auto completion and type validation using genql.
published: 2021-08-09
video: https://www.youtube.com/watch?v=QZwRgyXhlkE
repo: https://github.com/notrab/graphql.wtf-genql
instructor: instructors/jamie-barton.md
---

- [genql](https://genql.vercel.app)
- [genql docs](https://genql.vercel.app/docs)
- [genql converter](https://genql.vercel.app/converter)

```js
import { createClient } from "../generated";

export const client = createClient({
  url: "https://api-eu-central-1.graphcms.com/v2/ckrvra12f06pb01z82dn2ebd4/master",
});
```

```js
export const getStaticProps = async () => {
  const { products } = await client.query({
    products: {
      slug: true,
      name: true,
      image: {
        url: true,
      },
    },
  });

  return {
    props: {
      products,
    },
  };
};
```

```js
export async function getStaticProps({ params }) {
  const { slug } = params;

  const { product } = await client.query({
    product: [
      {
        where: {
          slug,
        },
      },
      {
        name: true,
        description: true,
        price: true,
        image: {
          url: true,
        },
      },
    ],
  });

  return {
    props: {
      product,
    },
  };
}
```

```js
export async function getStaticProps({ params }) {
  const { slug } = params;

  const product = await client.chain.query
    .product({ where: { slug } })
    .get({ ...everything, image: { ...everything } });

  return {
    props: {
      product,
    },
  };
}
```
