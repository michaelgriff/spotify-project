import React, { useState } from "react";
import io from "socket.io-client";

import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";
import AddToQueueButton from "../components/AddToQueueButton";
import SkipButton from "../components/SkipButton";

const socket = io("http://localhost:8888");

const Player = () => {
  const [queue, setQueue] = useState([]);

  const likeAndSort = (item) => {
    // we create a new copy of the queue so react
    // knows to rerender it
    var tempQueue = [...queue];
    var index = queue.indexOf(item);
    tempQueue[index].likeTot += 1;

    function compare(a, b) {
      if (a.likeTot < b.likeTot) return 1;
      if (b.likeTot < a.likeTot) return -1;
      return 0;
    }

    tempQueue.sort(compare);
    setQueue(tempQueue);
  };

  return (
    // // player
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
    // //   add to queue button
    // //   skip to next button (add to queue and then skip)

    <div>
      <h1>Player</h1>
      <SearchBar queue={queue} setQueue={setQueue} />
      <SongList queue={queue} setQueue={setQueue} likeAndSort={likeAndSort} />
      <AddToQueueButton queue={queue} setQueue={setQueue} />
      <SkipButton queue={queue} setQueue={setQueue} />
    </div>
  );
};

export default Player;
