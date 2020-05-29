import React from "react";

import { spotifyAuthContext } from '../contexts/spotifyAuthContext';

const SkipToNext = () => {
  const spotifyWebApi = React.useContext(spotifyAuthContext);

  const skipToNext = async (spotifyClient) => {
    await spotifyClient.skipToNext()
    alert("skipped");
  }

  return <button onClick={() => skipToNext(spotifyWebApi)}>Skip To Next</button>;
}

export default SkipToNext;
