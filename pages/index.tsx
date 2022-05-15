import { NextSeo } from "next-seo";
import { allEpisodes, Episode } from "contentlayer/generated";
import { GetStaticProps, NextPage } from "next";

import Layout from "@/components/Layout";
import { IndexView } from "@/components/IndexView";

interface Props {
  episodes: Episode[];
}

export const getStaticProps: GetStaticProps<Props> =
  async function getStaticProps() {
    const episodes = allEpisodes.sort((a, b) => b.position - a.position);

    return {
      props: {
        episodes,
      },
      revalidate: 120,
    };
  };

const Home: NextPage<Props> = ({ episodes }) => (
  <Layout title="Weekly GraphQL Screencasts">
    <NextSeo
      openGraph={{
        images: [
          {
            url: "https://graphql.wtf/graphql-wtf.png",
            width: 1200,
            height: 526,
          },
        ],
      }}
    />

    <IndexView episodes={episodes} />
  </Layout>
);

export default Home;
