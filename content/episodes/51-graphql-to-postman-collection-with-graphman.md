---
title: GraphQL to Postman collection with GraphMan
description: Learn how you can quickly create a Postman, or Insomnia collection from your GraphQL API using GraphMan.
published: 2022-07-18
video: https://youtu.be/c9UNg7ftKuk
repo:
instructor: instructors/jamie-barton.md
---

GraphMan is a great utility that runs via Deno to automatically convert your GraphQL endpoint to a collection that can be imported to Postman, and Insomnia.

GraphMan runs over Deno, and introspects your schema to get all available operations, fields, arguments, variables, and more.

To get started you'll need to install Deno. You can do this with Homebrew if you have that installed:

```bash
brew install deno
```

Then all that's left to do is provide the API pointpoint to the Deno script. Here I'll use the API endpoint `https://api.cartql.com` in my example:

```bash
deno run https://raw.githubusercontent.com/Escape-Technologies/graphman/main/src/index.ts https://api.cartql.com
```

You'll be asked to allow net, and write access. You'll want to accept these to continue.

Now you'll have a new folder with a name that looks a little something like:

```bash
api.cartql.com-autoGQL.postman_collection.json
```

This file will saved to the directory you ran the script inside of.

Now with this file all that's left to do is import it to Postman, or Insomnia.

That's it! You should now have a fully functioning collection of GraphQL operations that you can use to help improve your developer experience when working with GraphQL APIs.
