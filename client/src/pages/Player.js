import React, { useState, useEffect } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../socket-frontend/socket";
import io from "socket.io-client";

import getHashParams from "../utils/getHashParams";

import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";
import AddToQueueButton from "../components/AddToQueueButton";
import SkipButton from "../components/SkipButton";

const socket = io("http://localhost:8888");

const Player = () => {
  const [roomId, setRoomId] = useState();
  const [message, setMessage] = useState("");
  const [queue, setQueue] = useState([]);

  const params = getHashParams(window);
  console.log(params);
  if (params.uuid) {
    socket.emit("join", params.uuid);
    if (roomId !== params.uuid) {
      setRoomId(params.uuid);
    }
  }

  if (params.access_token) {
    // emit to server
    console.log("got an access token!");
    console.log(params.access_token);
    console.log(params.uuid);
    // giving the token to the backend
    socket.emit("accessToken", params.access_token);
  }

  useEffect(() => {
    if (roomId) initiateSocket(roomId);
    // subscribeToChat((err, data) => {
    //   if (err) return;
    //   setChat((oldChats) => [data, ...oldChats]);
    // });
    // return () => {
    //   disconnectSocket();
    // };
  }, [roomId]);

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
      <SearchBar
        queue={queue}
        setQueue={setQueue}
        socket={socket}
        roomId={params.uuid}
      />
      <SongList queue={queue} setQueue={setQueue} likeAndSort={likeAndSort} />
      <AddToQueueButton queue={queue} setQueue={setQueue} />
      <SkipButton queue={queue} setQueue={setQueue} />
    </div>
  );
};

export default Player;
