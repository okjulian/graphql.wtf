import { withContentlayer } from "next-contentlayer";

const config = () =>
  withContentlayer({
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/bee.js",
          destination: "https://cdn.splitbee.io/sb.js",
        },
        {
          source: "/_hive/:slug",
          destination: "https://hive.splitbee.io/:slug",
        },
      ];
    },
  });

export default config;
