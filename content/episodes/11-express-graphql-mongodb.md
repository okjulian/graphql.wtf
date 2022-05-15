---
title: Express GraphQL + MongoDB
description: Resolve queries and mutations with MongoDB.
published: 2021-10-11
video: https://www.youtube.com/watch?v=H7KifgrTVRY
repo: null
instructor: instructors/jamie-barton.md
---

- [MongoDB NPM](https://npmjs.com/package/mongodb)

```
MONGODB_URI=mongodb://localhost:27017/wtf-mongodb
```

```js
require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { MongoClient, ObjectId } = require("mongodb");
```

```js
const connectToDatabase = async () => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

  let cachedConnection;

  if (cachedConnection) return cachedConnection;

  try {
    const connection = await client.connect();

    cachedConnection = connection;

    return connection;
  } catch (error) {
    console.error(error);
  }
};
```

```js
const typeDefs = `
  type Query {
    users(limit: Int, skip: Int): [User]
    user(id: ID!): User
  }

  type Mutation {
    userCreate(input: UserInput!): UserCreatePayload
    userUpdate(input: UserInput!): UserUpdatePayload
    userDelete(input: UserDeleteInput!): UserDeletePayload
  }

  type User {
    id: ID!
    name: String!
    bio: String
  }

  input UserInput {
    id: ID
    name: String
    bio: String
  }

  input UserDeleteInput {
    id: ID!
  }

  type UserCreatePayload {
    user: User
  }

  type UserUpdatePayload {
    user: User
  }

  type UserDeletePayload {
    deletedUserId: ID
  }
`;
```

```js
const resolvers = {
  Query: {
    users: async (parent, { skip, limit }, context, info) => {
      const data = await context.mongo
        .db("wtf-mongodb")
        .collection("users")
        .find()
        .skip(parseInt(skip, 10) || 0)
        .limit(parseInt(limit, 10) || 0)
        .map(({ _id, ...user }) => ({ ...user, id: _id }))
        .toArray();

      return data;
    },
    user: async (parent, { id }, context, info) => {
      const { _id, ...user } = await context.mongo
        .db("wtf-mongodb")
        .collection("users")
        .findOne({
          _id: ObjectId(id),
        });

      return {
        id,
        ...user,
      };
    },
  },
  Mutation: {
    userCreate: async (parent, { input }, context, info) => {
      const { insertedId } = await context.mongo
        .db("wtf-mongodb")
        .collection("users")
        .insertOne(input);

      return {
        user: {
          id: insertedId,
          ...input,
        },
      };
    },
    userUpdate: async (parent, { input }, context, info) => {
      const { id, ...user } = input;

      const { _id, ...existingUser } = await context.mongo
        .db("wtf-mongodb")
        .collection("users")
        .findOne({
          _id: ObjectId(id),
        });

      await context.mongo.db("wtf-mongodb").collection("users").updateOne(
        {
          _id,
        },
        {
          $set: user,
        }
      );

      return {
        user: {
          id,
          ...existingUser,
          ...user,
        },
      };
    },
    userDelete: async (parent, { input }, context, info) => {
      const { id } = input;

      await context.mongo
        .db("wtf-mongodb")
        .collection("users")
        .deleteOne({
          _id: ObjectId(id),
        });

      return {
        deletedUserId: id,
      };
    },
  },
};
```

```js
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(
  "/graphql",
  graphqlHTTP(async () => {
    const mongo = await connectToDatabase();

    return {
      schema,
      graphiql: true,
      context: {
        mongo,
      },
    };
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started `);
});
```
