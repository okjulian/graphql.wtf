---
title: Type safe resolvers with GraphQL Code Generator
description: Detect errors while building your GraphQL API at build time instead of runtime with TypeScript. Also learn how to use resolver maps to separate database/GraphQL types.
published: 2022-01-24
video: https://youtu.be/tHMaNmqPIC4
repo: https://github.com/notrab/graphql.wtf-type-safe-resolver-codegen
instructor: instructors/jamie-barton.md
---

- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [TypeScript Resolvers Plugin](https://www.graphql-code-generator.com/plugins/typescript-resolvers)

```graphql
{
  cart(id: "wtf") {
    id
    totalItems
    items {
      id
      name
      quantity
      lineTotal {
        amount
        formatted
      }
    }
    subTotal {
      formatted
      amount
    }
  }
}
```

```yml
schema: schema.graphql
generates:
  types.ts:
    plugins:
      - "@graphql-codegen/typescript"
      - "@graphql-codegen/typescript-resolvers"
    config:
      mappers:
        Cart: ./model#CartModel
        CartItem: ./model#CartItemModel
      enumValues:
        Currency: ./model#CurrencyCode
```

```graphql
# schema.graphql
type Query {
  cart(id: ID!): Cart!
}

type Cart {
  id: ID!
  totalItems: Int!
  items: [CartItem!]!
  subTotal: Money!
}

type CartItem {
  id: ID!
  name: String!
  quantity: Int!
  unitTotal: Money!
  lineTotal: Money!
}

type Money {
  amount: Int!
  formatted: String!
}

enum Currency {
  USD
  GBP
  TRY
}
```

```ts
const resolvers: Resolvers = {
  Query: {
    cart: (_, { id }) => {
      return CARTS.find((cart) => cart._id === id);
    },
  },
  Cart: {
    id: (cart) => cart._id,
    totalItems: (cart) => cart.items.length,
    subTotal: (cart) => {
      const amount = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: cart.currency,
        }),
      };
    },
  },
  CartItem: {
    id: (item) => item._id,
    unitTotal: (item) => {
      const amount = item.price;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: item.currency,
        }),
      };
    },
    lineTotal: (item) => {
      const amount = item.quantity * item.price;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: item.currency,
        }),
      };
    },
  },
  Currency: {
    USD: CurrencyCode.USD,
    GBP: CurrencyCode.GBP,
    TRY: CurrencyCode.TRY,
  },
};
```

```ts
export enum CurrencyCode {
  USD = "USD",
  GBP = "GBP",
  TRY = "TRY",
}

export type CartModel = {
  _id: string;
  items: CartItemModel[];
  currency: CurrencyCode;
};

export type CartItemModel = {
  _id: string;
  name: string;
  quantity: number;
  currency: CurrencyCode;
  price: number;
};
```
