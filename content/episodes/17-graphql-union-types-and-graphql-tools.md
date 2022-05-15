---
title: GraphQL Union Types and GraphQL Tools
description: Learn how to define a GraphQL Union Type using GraphQL Tools.
published: 2021-11-22
video: https://youtu.be/CLqBeUn50KI
repo: https://github.com/notrab/graphql.wtf-graphql-tools-union-type
instructor: instructors/jamie-barton.md
---

- [GraphQL Tools](https://www.graphql-tools.com/docs/generate-schema)

```js
const typeDefs = `
  type Query {
    tracks: [Track]
    videos: [Video]
    images: [Image]
    feed: [FeedItem!]!
  }

  union FeedItem = Track | Video | Image

  type Track {
    duration: Int
    format: TrackFormat
  }

  type Video {
    length: Int
    format: VideoFormat
  }

  type Image {
    width: Int
    height: Int
    format: ImageFormat
  }

  enum TrackFormat {
    WAV
    MP3
    AAC
  }

  enum VideoFormat {
    AVI
    MP4
    M4V
  }

  enum ImageFormat {
    PNG
    JPG
    TIFF
  }
`;
```

```js
const resolvers = {
  Query: {
    tracks: () => tracks,
    videos: () => videos,
    images: () => images,
    feed: () => [
      ...tracks,
      ...videos,
      ...images,
      {
        width: 500,
        height: 350,
        format: "TIFF",
      },
    ],
  },
  FeedItem: {
    __resolveType: (object) => {
      if (object.duration) {
        return "Track";
      }
      if (object.length) {
        return "Video";
      }
      if (object.width) {
        return "Image";
      }
      return null;
    },
  },
};
```
