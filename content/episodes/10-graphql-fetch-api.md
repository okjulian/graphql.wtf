---
title: GraphQL + Fetch API
description: Execute GraphQL queries and mutations using the fetch API.
published: 2021-10-04
video: https://www.youtube.com/watch?v=Jc4RLVonQfg
repo: null
instructor: instructors/jamie-barton.md
---

- [Fetch API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Using Fetch (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [axios](https://www.npmjs.com/package/axios)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

```js
const query = `
	query GetCartById($id: ID!) {
		cart(id: $id) {
			totalItems
			subTotal {
				amount
				formatted
			}
			items {
				id
				name
				quantity
				unitTotal {
					formatted
				}
			}
		}
	}
`;

const variables = {
  id: "ck5r8d5b500003f5o2aif0v2b",
};

const body = JSON.stringify({ query, variables });

fetch("https://api.cartql.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body,
})
  .then((res) => res.json())
  .then(({ data }) => console.log(data));
```

```js
const axios = require("axios");

const request = axios({
  url: endpoint,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: body,
});

request.then(({ data: { data } }) => console.log(data));
```
