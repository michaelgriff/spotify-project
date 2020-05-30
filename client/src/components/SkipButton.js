import React from "react";

import { spotifyAuthContext } from '../contexts/spotifyAuthContext';

const SkipButton = () => {
  const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  const skipToNext = async (spotifyClient) => {
    await spotifyClient.skipToNext()
    alert("skipped");
  }

  return (
    <div>
      <button onClick={() => skipToNext(spotifyWebApi)}>Skip to Next</button>
    </div>
  );
}

export default SkipButton;
