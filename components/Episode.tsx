import Link from "next/link";
import Image from "next/image";
import cc from "classcat";
import { Episode as IEpisode } from "contentlayer/generated";

interface EpisodeProps extends IEpisode {
  featured?: boolean;
}

function Episode({
  slug,
  title,
  position,
  description,
  published,
  cover,
  featured = false,
  instructor,
}: EpisodeProps) {
  const date = new Date(published);

  const formattedPublishedAt = published
    ? new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date.getTime() - date.getTimezoneOffset() * -60000))
    : null;

  const wrapperClass = cc([
    "group rounded-md bg-white",
    {
      "shadow-xl": featured,
      "md:shadow": !featured,
    },
  ]);

  return (
    <article key={slug} className={wrapperClass}>
      <Link href={`/episodes/${slug}`}>
        <a className="flex flex-col items-center space-y-3 md:space-y-0 p-6">
          <div className="flex-shrink-0 flex items-center justify-center w-full transition transform md:group-hover:scale-[102%] aspect-video relative rounded-md overflow-hidden md:group-hover:shadow-xl bg-gray-300">
            {featured && (
              <div className="rounded-md shadow-md text-white uppercase font-bold text-xs px-2 py-0.5 inline-block absolute bottom-0 left-0 z-20 ml-5 bg-razzmatazz mb-5">
                New episode
              </div>
            )}
            {cover && <Image src={cover} layout="fill" alt={title} />}
          </div>
          <div className="w-full space-y-3 pt-3 md:pt-6">
            <p className="font-extrabold text-xl md:text-2xl text-haiti group-hover:text-razzmatazz transition-colors tracking-tight">
              {title}
            </p>
            <div className="inline-flex items-center space-x-2 text-gray-500">
              {instructor && (
                <div className="w-5 h-5 rounded-md overflow-hidden bg-gray-300 relative">
                  {instructor?.avatar && (
                    <Image
                      src={instructor.avatar}
                      layout="fill"
                      alt={instructor.name}
                    />
                  )}
                </div>
              )}
              <p className="text-sm tracking-tight">Episode #{position}</p>
              <p className="text-sm tracking-tight">&mdash;</p>
              {published && (
                <p className="text-sm tracking-tight">
                  Published on {formattedPublishedAt}
                </p>
              )}
            </div>
            <p className="text-gray-600 leading-6 text-sm tracking-tight">
              {description}
            </p>
          </div>
        </a>
      </Link>
    </article>
  );
}

export default Episode;
