import React from "react";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const SkipButton = (props) => {
  props.socket.on("skipped", () => {
    console.log("skipped");
    remove();
  });

  const skipToNext = async (token) => {
    // await spotifyClient.skipToNext();
    props.socket.emit("skip", token);
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
          skipToNext(props.accessToken);
        }}
      >
        Skip to Next
      </button>
    </div>
  );
};

export default SkipButton;
