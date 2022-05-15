import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import splitbee from "@splitbee/web";

import SubscribeForm from "@/components/SubscribeForm";

type Props = {
  video: string;
  autoPlay: boolean;
  handleOnEnded: any;
};

function EpisodePlayer({ video, autoPlay, handleOnEnded }: Props) {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  const onPlay = () => {
    splitbee.track("play", { video });
    setPlaying(true);
  };

  const onPause = () => {
    splitbee.track("pause", { video });
    setPlaying(false);
  };

  const onEnded = () => {
    splitbee.track("finished", { video });
    setPlaying(false);
    !autoPlay && setFinished(true);
    handleOnEnded();
  };

  const replay = () => {
    splitbee.track("replay", { video });
    setFinished(false);
    setPlaying(true);
  };

  return (
    <div className="bg-black aspect-video flex items-center justify-center relative z-20 md:rounded-md md:shadow-2xl overflow-hidden">
      {finished ? (
        <div className="flex items-center justify-center rounded">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-white text-lg md:text-xl font-medium">
              Get new episodes directly to your inbox, no spam.
            </p>
            <SubscribeForm />
            <button
              className="appearance-none text-white bg-gray-800 hover:bg-gray-700 rounded-md py-3 px-6 font-medium"
              onClick={replay}
            >
              Watch again?
            </button>
          </div>
        </div>
      ) : (
        <ReactPlayer
          url={video}
          playing={playing}
          height="100%"
          width="100%"
          onEnded={onEnded}
          onPlay={() => onPlay}
          onPause={() => onPause}
          controls
        />
      )}
    </div>
  );
}

export default EpisodePlayer;
