import React from "react";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const AddToQueueButton = (props) => {
  props.socket.on("added", () => {
    console.log("added");
    remove();
  });

  const addToQueue = async (trackURI, token) => {
    // await spotifyClient.addToQueue(trackURI);
    props.socket.emit('addToQueue', {trackURI, token});
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
    <button
      onClick={() => {
        if (props.queue[0]) {
          addToQueue(props.queue[0].uri, props.accessToken);
        }
      }}
    >
      Add To Queue
    </button>
  );
};

export default AddToQueueButton;
