---
title: Execute lazy queries with React Apollo Client
description: Execute GraphQL queries in response to events made by your application using the useLazyQuery hook.
published: 2022-03-14
video: https://www.youtube.com/watch?v=ct1y4rhCt9U
repo: https://github.com/notrab/graphql.wtf-apollo-client-lazy-query
instructor: instructors/jamie-barton.md
---

- [`useLazyQuery` docs](https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery)

```js
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const GET_RESULTS_QUERY = gql`
  query GetResults {
    results
  }
`;

const Home: NextPage = () => {
  const results = useQuery(GET_RESULTS_QUERY);
  const [getLazyResults, lazyResults] = useLazyQuery(GET_RESULTS_QUERY);

  return (
    <div>
      <h2>
        Apollo Client <code>useQuery</code>
      </h2>
      <ResultList {...results} />
      <hr />
      <h2>
        Apollo Client <code>useLazyQuery</code>
      </h2>
      <button onClick={() => getLazyResults()}>Get results</button>
      <ResultList {...lazyResults} />
    </div>
  );
};
```

```js
const ResultList = ({
  data,
  loading,
}: {
  data: { results: string[] },
  loading: boolean,
}) => {
  if (loading) return <p>loading...</p>;

  return (
    <ul>
      {data?.results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );
};
```
