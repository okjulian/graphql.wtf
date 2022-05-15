import { Episode as IEpisode } from "contentlayer/generated";

import Episode from "@/components/Episode";

type Props = {
  episodes?: IEpisode[];
};

function EpisodeList({ episodes = [] }: Props) {
  return (
    <div className="max-w-7xl mx-auto md:space-y-6 pb-12 px-6 md:px-0 py-6 md:py-12">
      <div className="grid md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {episodes.map((episode) => (
          <Episode key={episode._id} {...episode} />
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
