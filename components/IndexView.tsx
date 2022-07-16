import { Fragment } from "react";
import { Episode as IEpisode } from "contentlayer/generated";

import Nav from "@/components/Nav";
import SubscribeForm from "@/components/SubscribeForm";
import Episode from "@/components/Episode";
import EpisodeList from "@/components/EpisodeList";

export const IndexView = ({ episodes = [] }: { episodes: IEpisode[] }) => {
  const [latestEpisode, ...remainingEpisodes] = episodes;

  return (
    <Fragment>
      <div className="bg-haiti relative overflow-hidden">
        <Nav />
        <div className="max-w-6xl mx-auto px-6 xl:px-0 relative z-20">
          <div className="py-12 md:py-24 lg:pb-36">
            <div className="lg:flex lg:items-center lg:justify-around lg:space-x-6 space-y-12 lg:space-y-0">
              <div className="text-center lg:text-left space-y-3 md:space-y-6 lg:space-y-12 flex-1">
                <h1 className="text-white text-3xl md:text-5xl font-extrabold md:leading-tight tracking-tighter">
                  Learn something new with GraphQL,{" "}
                  <span className="text-razzmatazz">every week.</span>
                </h1>
                <div className="space-y-3 md:space-y-6">
                  <p className="text-white md:text-xl lg:text-2xl text-opacity-70">
                    Get new episodes directly to your inbox.
                  </p>
                  <div className="flex lg:no-block justify-center lg:justify-start">
                    <SubscribeForm />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-96">
                <Episode {...latestEpisode} featured />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="episodes" className="relative bg-white md:bg-gray-100">
        <div className="hidden md:block text-center pt-16 pb-6">
          <h2 className="text-haiti text-2xl md:text-4xl font-extrabold leading-relaxed tracking-tighter">
            Recent episodes
          </h2>
        </div>
        <EpisodeList episodes={remainingEpisodes} />
      </div>
      <section className="py-12 bg-gray-200 overflow-hidden md:py-20 lg:py-24 border-t border-gray-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img className="mx-auto h-8" src="/the-guild.svg" alt="The Guild" />
          <blockquote className="mt-10">
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                &ldquo;Jamie keeps making GraphQL things simple as they should
                be! GraphQL.wtf is such a valuable asset to the
                community!&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <img
                    className="mx-auto h-10 w-10 rounded-full"
                    src="/uri-goldshtein.jpeg"
                    alt="Uri Goldshtein"
                  />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">
                    Uri Goldshtein
                  </div>

                  <svg
                    className="hidden md:block mx-1 h-5 w-5 text-razzmatazz"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>

                  <div className="text-base font-medium text-gray-500">
                    Founder, The Guild
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>
    </Fragment>
  );
};
