---
title: Batching with DataLoader
description: Reduce overloading your database by batching requests. Discover how to instantiate, and share dataloaders through server context, and pass request headers to your dataloader.
published: 2022-05-02
video: https://www.youtube.com/watch?v=-uSDpEp5uJc
repo: https://github.com/graphqlwtf/episode-40-dataloader
instructor: instructors/jamie-barton.md
---

GraphQL makes it all too easy to overload your database with requests. Writing resolvers is at the core of any GraphQL server, and if you're not careful, you can very easily bring down your database in a single GraphQL query.

[DataLoader](https://github.com/graphql/dataloader) was introduced to help with batching and caching requests to prevent sending unnecessary requests to your database. Using DataLoader we can create a "loader" that we use inside of our resolvers. If the loader has a value with the key already, that will be used, otherwise it'll execute your loader only once, unless you clear it.

We'll use an existing GraphQL server using GraphQL Yoga, and some static data, we'll replicate the overloading problem.

Let's take the following SDL:

```graphql
type Query {
  users: [User!]!
}

type User {
  id: ID!
  name: String!
  bestFriend: User!
}
```

I have an array of users that I have the following function that replicates the simple behaviour of a database fetching this item.

```ts
const getUserById = (id: string): User => {
  console.log(`Calling getUserById for id: ${id}`);

  return users.find((d) => d.id === id);
};
```

Then inside of our GraphQL resolvers, we have a field resolver for `User.bestFriend` that calls the `getUserById` function above.

```ts
const resolvers = {
  Query: {
    users: () => users,
  },
  User: {
    bestFriend: async ({ bestFriendId }) => {
      const user = await getUserById(bestFriendId);

      return user;
    },
  },
};
```

If we now execute a query to fetch a user's best friend, their best friend, and their best friend... Wherever the same user is referenced, we will call `getUserById` multiple times.

Here's the query, and while it probably abuses nested queries, it demonstrates quite clearly the issue dataloader can solve:

```graphql
{
  users {
    name
    bestFriend {
      name
      bestFriend {
        name
        bestFriend {
          name
        }
      }
    }
  }
}
```

We can see the output of `console.log` in our terminal of this happening:

```bash
Calling getUserById for id: 2
Calling getUserById for id: 3
Calling getUserById for id: 2
Calling getUserById for id: 3
Calling getUserById for id: 2
Calling getUserById for id: 3
Calling getUserById for id: 2
Calling getUserById for id: 3
Calling getUserById for id: 2
```

We can see here that we made far too many requests to the same function `getUserBydId` for a single user.

Thankfully [DataLoader](https://github.com/graphql/dataloader) gives us a simple batching mechanism that we can use to reduce the multiple requests to `getUserById`.

Next we'll create a function that allows us to pass multiple `id`'s that it can then pass onto `getUserById`. This function must return a `Promise`. It's what is expected of DataLoader.

```ts
const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  return ids.map((id) => getUserById(id));
};
```

Now using something like [GraphQL Yoga](/episodes/36-graphql-yoga-2) we can instantiate a `new DataLoader` and pass it our `getUsersByIds` function in it's constructor:

```ts
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: () => ({
    userLoader: new DataLoader(getUsersByIds),
  }),
});
```

Now inside of our resolver code we can get `userLoader`, and replace our previous implementation with something that looks like this:

```ts
const resolvers = {
  Query: {
    users: () => users,
  },
  User: {
    bestFriend: async ({ bestFriendId }, _, { userLoader }) => {
      const user = await userLoader.load(bestFriendId);

      return user;
    },
  },
};
```

Now when we make the same query as we did above, we should see significantly less `console.log` statements inside the terminal:

```bash
Calling getUserById for id: 2
Calling getUserById for id: 3
```

If some resolvers require authorization logic, have no fear! Using GraphQL Yoga you have access to the `Request` object that is sent, and you can `.get()` things from the `headers` to pass to your business logic.

```ts
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: ({ req }) => {
    const authorizationToken = req.headers["authorization"];

    return {
      userLoader: new DataLoader((ids) =>
        getUsersByIds(ids, authorizationToken)
      ),
    };
  },
});
```

I should end by saying that DataLoader doesn't replace the need for a cache, so you'll want to make sure you're implementing something like that as well.

## Conclusion

- DataLoader is great for batching requests and executing once to load the data you need.
- DataLoader is not unique to GraphQL. It can work with other implementations, and even outside of JavaScript.
- DataLoader was initially created by the founders of GraphQL for use internally at Facebook, but later open sourced.
- DataLoader was recently taken over by The Guild to continue maintenance, and future development.
