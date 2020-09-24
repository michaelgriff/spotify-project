import React from "react";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const AddToQueueButton = (props) => {
  const addToQueue = async (spotifyClient, trackURI) => {
    // await spotifyClient.addToQueue(trackURI);
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
        // addToQueue(spotifyWebApi, props.queue[0].uri);
        remove();
      }}
    >
      Add To Queue
    </button>
  );
};

export default AddToQueueButton;
