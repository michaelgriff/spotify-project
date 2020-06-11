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
    alert("added to queue");
  };

  return (
    <button
      onClick={() => {
        // this.remove();
        // this.addToQueue(this.state.queue[0].uri);
        addToQueue(spotifyWebApi, props.trackURI);
      }}
    >
      Add To Queue
    </button>
  );
};

export default AddToQueueButton;
