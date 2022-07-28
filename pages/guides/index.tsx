import { NextSeo } from "next-seo";

import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import {
  allGuideEpisodes,
  allGuides,
  Guide,
  GuideEpisode,
} from "@/.contentlayer/generated";
import { GetStaticProps, NextPage } from "next";

interface IProps {
  guides: Guide[];
  guideEpisodes: Record<Guide["title"], GuideEpisode>;
}

const GuidesPage: NextPage<IProps> = function GuidesPage({
  guides,
  guideEpisodes,
}) {
  return (
    <Layout title="GraphQL Guides">
      <NextSeo
        openGraph={{
          images: [
            {
              url: "https://graphql.wtf/graphql-course.png",
              width: 1200,
              height: 526,
            },
          ],
        }}
      />
      <div className="bg-haiti relative overflow-hidden">
        <Nav />
        <div className="mx-auto flex items-center justify-center relative p-6 pb-12 md:p-12 lg:pb-32">
          <div className="text-center space-y-4 md:space-y-6 max-w-4xl z-10 relative">
            <h1 className="text-white text-3xl md:text-6xl font-extrabold md:leading-tight tracking-tighter">
              Step by step <span className="text-razzmatazz">GraphQL</span>{" "}
              guides.
            </h1>
          </div>
        </div>
      </div>
      {guides.map((guide) => (
        <div id="guides" className="relative bg-white md:bg-gray-100">
          <div className="py-6 md:py-12">
            <div className="max-w-4xl mx-auto md:space-y-6">
              <div className="md:shadow md:rounded-md md:bg-white">
                <div className="flex-1 px-6 py-8 lg:p-12 space-y-8">
                  <div className="lg:flex lg:justify-between lg:items-center lg:space-x-12 space-y-6 lg:space-y-0">
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-2xl lg:text-3xl text-haiti group-hover:text-razzmatazz transition-colors tracking-tight">
                          {guide.title}
                        </h3>
                        <Link
                          href={{
                            pathname: "/guides/[guide]/[step]",
                            query: {
                              guide: guide.slug,
                              step: guideEpisodes[guide.slug].slug,
                            },
                          }}
                        >
                          <a className="inline-block bg-razzmatazz text-white px-6 py-2 rounded-md font-medium shadow">
                            Start learning
                          </a>
                        </Link>
                      </div>
                      <p className="text-gray-600 leading-6 tracking-tight">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-3 bg-white text-sm tracking-wider font-semibold uppercase text-razzmatazz">
                        Technologies
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul
                      role="list"
                      className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-5"
                    >
                      {guide.technologies.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start lg:col-span-1"
                        >
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="h-5 w-5 text-razzmatazz"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default GuidesPage;

export const getStaticProps: GetStaticProps<IProps> =
  async function getStaticProps({ params }) {
    const guides = allGuides;
    let guideEpisodes: Record<Guide["title"], GuideEpisode> = {};

    for (const guideEpisode of allGuideEpisodes) {
      if (guideEpisode.position === 0) {
        guideEpisodes[guideEpisode.guide] = guideEpisode;
      }
    }

    return {
      props: {
        guides,
        guideEpisodes,
      },
      revalidate: 120,
    };
  };
