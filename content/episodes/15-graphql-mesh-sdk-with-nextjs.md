---
title: GraphQL Mesh SDK with Next.js
description: Combine multiple GraphQL Mesh sources as a single GraphQL API, and extend types from one source to include another. Then generate a SDK that can be used on the server to fetch data for a Next.js page.
published: 2021-11-08
video: https://www.youtube.com/watch?v=XkzppOTs7ZU
repo: null
instructor: instructors/jamie-barton.md
---

- [GraphQL Mesh](https://www.graphql-mesh.com/docs/recipes/multiple-apis)

```yml
documents:
  - ./graphql/**/*.{gql,graphql}

sources:
  - name: Cities
    handler:
      openapi:
        source: https://api.apis.guru/v2/specs/mashape.com/geodb/1.0.0/swagger.json
        operationHeaders:
          "X-RapidAPI-Key": "..."
  - name: Weather
    handler:
      openapi:
        source: https://api.apis.guru/v2/specs/weatherbit.io/2.0.0/swagger.json

additionalTypeDefs: |
  extend type PopulatedPlaceSummary {
    todayForecast: Forecast
  }

additionalResolvers:
  - targetTypeName: PopulatedPlaceSummary
    targetFieldName: todayForecast
    requiredSelectionSet: |
      {
        latitude
        longitude
      }
    sourceName: Weather
    sourceTypeName: Query
    sourceFieldName: getForecastDailyLatequalToLatLonLon
    sourceArgs:
      lat: "{root.latitude}"
      lon: "{root.longitude}"
      days: 1
      key: "..."
    result: data[0]
```

```graphql
query GetCityAndWeatherByName($name: String) {
  findCitiesUsingGET(namePrefix: $name) {
    data {
      name
      todayForecast {
        minTemp
        maxTemp
      }
    }
  }
}
```

```js
import { getMeshSDK } from "../.mesh";

export async function getStaticProps() {
  const { GetCityAndWeatherByName } = await getMeshSDK();

  const {
    findCitiesUsingGET: { data },
  } = await GetCityAndWeatherByName({
    name: "Newcastle Upon Tyne",
  });

  return {
    props: {
      data,
    },
  };
}

export default function IndexPage({ data }) {
  return (
    <div>
      <h1>Country</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
