import React, { useState } from "react";

import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";

const Player = () => {
  const [queue, setQueue] = useState([]);

  return (
    // // home
    // //   link to the room
    // //   search bar
    // //     search list
    // //       search list items
    // //         song title
    // //         song artist
    // //         album cover
    // //   song list (state: [song list items])
    // //       song list items
    // //         song title
    // //         artist
    // //         album cover
    // //         like button
    // //         like total
    // //     add to queue button
    // //     skip to next button (add to queue and then skip)

    <div>
      <h1>Player</h1>
      <SearchBar queue={queue} setQueue={setQueue} />
      <SongList queue={queue} setQueue={setQueue} />
    </div>
  );
};

export default Player;
