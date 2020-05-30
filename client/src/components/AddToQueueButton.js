import React from "react";

import { spotifyAuthContext } from '../contexts/spotifyAuthContext';

const AddToQueueButton = () => {
  const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  const remove = () => {
    // client.send(
    //   JSON.stringify({
    //     type: "remove",
    //   })
    // );
    alert("added to next");
  };

  const addToQueue = (trackURI, ) => {
    spotifyWebApi.addToQueue(trackURI).then(() => {
      console.log("success");
    });
  };

  return (
    <button
      onClick={() => {
        this.remove();
        //   this.addToQueue(this.state.queue[0].uri);
      }}
    >
      Add To Queue
    </button>
  );
}

export default AddToQueueButton;
