import { DefaultSeoProps } from "next-seo";

const defaultTitle = "graphql.wtf";
const description = "Learn something new with GraphQL, every week.";
const url = "https://graphql.wtf";

const seo: DefaultSeoProps = {
  defaultTitle,
  titleTemplate: "%s | graphql.wtf",
  description,
  additionalMetaTags: [],
  twitter: {
    handle: "@graphqlwtf",
    site: "@graphqlwtf",
    cardType: "summary_large_image",
  },
};

export { seo as defaultSEO, url as defaultUrl };
