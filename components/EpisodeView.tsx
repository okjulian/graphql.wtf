import { useState } from "react";
import Image from "next/image";
import { Episode as IEpisode } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";

import Nav from "@/components/Nav";
import Link from "@/components/Link";
import EpisodePlayer from "@/components/EpisodePlayer";
import Episode from "@/components/Episode";
import Share from "@/components/Share";
import { FYI } from "@/components/FYI";

type Props = {
  episode: IEpisode | null;
  previousEpisode?: IEpisode;
  nextEpisode?: IEpisode;
};

function EpisodeView({ episode, previousEpisode, nextEpisode }: Props) {
  const router = useRouter();

  // const { instructor, published, related } = episode;
  const { instructor, published } = episode;
  const [autoplayEnabled, setAutoplayEnabled] = useState(!!nextEpisode);

  console.log({ instructor });

  const date = new Date(published);

  const formattedPublishedAt = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date.getTime() - date.getTimezoneOffset() * -60000));

  const goToNextEpisode = () => {
    if (autoplayEnabled && nextEpisode) {
      router.push(`/episodes/${nextEpisode.slug}`);
    }
  };

  const MDXContent = useMDXComponent(episode?.body.code);

  return (
    <>
      <div className="bg-haiti relative overflow-hidden">
        <Nav />
        <div className="max-w-6xl mx-auto px-6 lg:px-0 pb-6 md:pt-6 space-y-6 relative z-20">
          <EpisodePlayer
            video={episode?.video}
            autoPlay={autoplayEnabled}
            handleOnEnded={goToNextEpisode}
          />

          <div className="flex items-start justify-between px-6 md:px-0 py-6">
            <div>
              {previousEpisode && (
                <Link
                  href={previousEpisode.url}
                  className="text-white flex items-center space-x-3 group"
                >
                  <ChevronLeftIcon className="text-white text-opacity-50 group-hover:text-opacity-100 transition w-6 h-6" />
                  <div>
                    <span className="text-lg hidden sm:block">
                      {previousEpisode.title}
                    </span>
                  </div>
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {nextEpisode && (
                <>
                  <div className="flex items-center space-x-1.5">
                    <Switch
                      checked={autoplayEnabled}
                      onChange={setAutoplayEnabled}
                      className={`${
                        autoplayEnabled ? "bg-razzmatazz" : "bg-haiti"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span className="sr-only">Autoplay</span>
                      <span
                        className={`${
                          autoplayEnabled ? "translate-x-6" : "translate-x-1"
                        } inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200`}
                      />
                    </Switch>
                  </div>

                  <Link
                    href={nextEpisode.url}
                    className="flex items-center space-x-3 group text-right"
                  >
                    <div>
                      <span className="text-white text-lg hidden sm:block">
                        {nextEpisode.title}
                      </span>
                    </div>
                    <ChevronRightIcon className="text-white text-opacity-50 group-hover:text-opacity-100 transition w-6 h-6" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="bg-gray-100 py-6 md:py-12">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <div className="prose max-w-none">
              <h1>{episode.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: episode.description }} />
            </div>

            <Share
              title={episode.title}
              slug={episode.slug}
              repositoryUrl={episode?.repo}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="py-12">
            <div className="prose max-w-none">
              <MDXContent components={{ FYI }} />
            </div>
            {instructor && (
              <div className="mt-6 md:mt-12 inline-flex items-center space-x-2">
                <div className="w-5 h-5 rounded-md overflow-hidden relative">
                  {instructor?.avatar && (
                    <Image
                      src={instructor.avatar}
                      layout="fill"
                      alt={instructor.name}
                    />
                  )}
                </div>

                <p className="text-gray-500 text-sm tracking-tight">
                  Published on {formattedPublishedAt} by {instructor.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* {related && related.length >= 1 && (
        <section className="py-12 bg-gray-100">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 md:space-y-12">
              <div className="text-center pt-6 md:pb-6">
                <h2 className="text-haiti text-2xl md:text-4xl font-extrabold leading-relaxed tracking-tighter">
                  Related episode{related.length >= 1 && "s"}
                </h2>
              </div>
              <div className="grid md:gap-6 md:grid-cols-2">
                {related.map((relatedEpisode) => (
                  <Episode key={relatedEpisode.id} {...relatedEpisode} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}
    </>
  );
}

export default EpisodeView;
