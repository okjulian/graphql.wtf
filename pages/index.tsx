import { NextSeo } from "next-seo";
import {
  allEpisodes,
  allGuideEpisodes,
  allGuides,
  Episode,
  Guide,
  GuideEpisode,
} from "contentlayer/generated";
import { GetStaticProps, NextPage } from "next";

import Layout from "@/components/Layout";
import { IndexView } from "@/components/IndexView";

interface Props {
  episodes: Episode[];
  guides: Guide[];
  guideEpisodes: Record<Guide["slug"], GuideEpisode>;
}

export const getStaticProps: GetStaticProps<Props> =
  async function getStaticProps() {
    const episodes = allEpisodes.sort((a, b) => b.position - a.position);
    const guides = allGuides.sort(
      (a, b) =>
        new Date(b.published).getTime() - new Date(a.published).getTime()
    );
    let guideEpisodes: Record<Guide["slug"], GuideEpisode> = {};

    for (const guideEpisode of allGuideEpisodes) {
      if (guideEpisode.position === 0) {
        guideEpisodes[guideEpisode.guide] = guideEpisode;
      }
    }

    return {
      props: {
        episodes,
        guides,
        guideEpisodes,
      },
      revalidate: 120,
    };
  };

const Home: NextPage<Props> = ({ episodes, guides, guideEpisodes }) => (
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

    <IndexView
      episodes={episodes}
      guides={guides}
      guideEpisodes={guideEpisodes}
    />
  </Layout>
);

export default Home;
