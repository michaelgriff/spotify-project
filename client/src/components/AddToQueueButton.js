import React from "react";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const AddToQueueButton = (props) => {
  const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  // const remove = () => {
  //   // client.send(
  //   //   JSON.stringify({
  //   //     type: "remove",
  //   //   })
  //   // );
  //   alert("added to next");
  // };

  const addToQueue = async (spotifyClient, trackURI) => {
    await spotifyClient.addToQueue(trackURI);
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
        // this.remove();
        // this.addToQueue(this.state.queue[0].uri);
        addToQueue(spotifyWebApi, props.queue[0].uri);
        remove();
      }}
    >
      Add To Queue
    </button>
  );
};

export default AddToQueueButton;
