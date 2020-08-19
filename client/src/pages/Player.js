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
  const params = getHashParams(window);
  if (params.access_token) {
    // emit to server
    console.log("got an access token!");
    console.log(params.access_token);
    socket.emit("accessToken", params.access_token);
  }
  const rooms = ["A", "B", "C"];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {
      if (err) return;
      setChat((oldChats) => [data, ...oldChats]);
    });
    return () => {
      disconnectSocket();
    };
  }, [room]);

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

      <div>
        <h1>Room: {room}</h1>
        {rooms.map((r, i) => (
          <button onClick={() => setRoom(r)} key={i}>
            {r}
          </button>
        ))}
        <h1>Live Chat:</h1>
        <input
          type="text"
          name="name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(room, message)}>Send</button>
        {chat.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default Player;
