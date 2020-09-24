import React from "react";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const SkipButton = (props) => {
  const skipToNext = async (spotifyClient) => {
    // await spotifyClient.skipToNext();
    alert("skipped");
  };

  const remove = () => {
    if (props.queue) {
      let tempQueue = props.queue;

      if (tempQueue.length === 1) {
        props.setQueue([]);
      } else {
        tempQueue.shift();
        props.setQueue(tempQueue);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          // skipToNext(spotifyWebApi);
          remove();
        }}
      >
        Skip to Next
      </button>
    </div>
  );
};

export default SkipButton;
