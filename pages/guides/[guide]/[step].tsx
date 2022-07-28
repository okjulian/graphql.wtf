import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { NextSeo, VideoJsonLd } from "next-seo";
import { allGuideEpisodes, GuideEpisode } from "contentlayer/generated";

import Layout from "@/components/Layout";
import EpisodeView from "@/components/EpisodeView";

interface IProps {
  episode: GuideEpisode | null;
  previousEpisode?: GuideEpisode;
  nextEpisode?: GuideEpisode;
}

export const getStaticProps: GetStaticProps<IProps> =
  async function getStaticProps({ params }) {
    const guide = allGuideEpisodes.filter(
      (step) => step.guide === params.guide
    );

    const episode = guide.find((s) => s.slug === params.step) || null;
    const previousEpisode =
      guide.find((s) => s.position === episode?.position - 1) || null;
    const nextEpisode =
      guide.find((s) => s.position === episode?.position + 1) || null;

    if (!episode)
      return {
        notFound: true,
        revalidate: 120,
      };

    return {
      props: {
        previousEpisode: previousEpisode,
        nextEpisode: nextEpisode,
        episode,
      },
      revalidate: 120,
    };
  };

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allGuideEpisodes.map((episode) => {
      return {
        params: { guide: episode.guide, step: episode.slug },
      };
    }),
    fallback: "blocking",
  };
};

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
