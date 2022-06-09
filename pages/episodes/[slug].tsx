import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { NextSeo, VideoJsonLd } from "next-seo";
import { Episode, allEpisodes } from "contentlayer/generated";

import Layout from "@/components/Layout";
import EpisodeView from "@/components/EpisodeView";

interface IProps {
  episode: Episode | null;
  previousEpisode?: Episode;
  nextEpisode?: Episode;
}

export const getStaticProps: GetStaticProps<IProps> =
  async function getStaticProps({ params }) {
    const { slug } = params;

    const episode =
      allEpisodes.find((episode) => episode.slug === slug) || null;

    if (!episode)
      return {
        notFound: true,
        revalidate: 120,
      };

    return {
      props: {
        previousEpisode: null,
        nextEpisode: null,
        episode,
      },
      revalidate: 120,
    };
  };

export const getStaticPaths: GetStaticPaths = () => ({
  paths: allEpisodes.map((episode) => ({ params: { slug: episode.slug } })),
  fallback: "blocking",
});

const EpisodePage: NextPage<IProps> = ({
  episode,
  previousEpisode,
  nextEpisode,
}) => {
  const title = `${episode.title} - Episode #${episode.position}`;

  return (
    <Layout title={title}>
      <NextSeo
        openGraph={{
          type: "video.movie",
          images: [
            {
              url:
                `https://graphql.wtf${episode?.cover}` ??
                "https://graphql.wtf/graphql-wtf.png",
              width: 1200,
              height: 526,
            },
          ],
        }}
      />
      <VideoJsonLd
        name={episode.title}
        description={episode.description}
        thumbnailUrls={[episode?.cover]}
        uploadDate={episode.published}
      />
      <EpisodeView
        episode={episode}
        previousEpisode={previousEpisode}
        nextEpisode={nextEpisode}
      />
    </Layout>
  );
};

export default EpisodePage;
