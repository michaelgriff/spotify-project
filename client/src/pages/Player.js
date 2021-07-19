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
  const [join, setJoin] = useState(true);
  const [accessToken, setAcessToken] = useState();

  const params = getHashParams(window);
  console.log(params);
  console.log(params);
  if (params.uuid && join) {
    setJoin(false);
    socket.emit("join", params.uuid);
    if (roomId !== params.uuid) {
      setRoomId(params.uuid);
    }
  }

  socket.on('newUser', () => {
    socket.emit("accessToken", params.access_token);
  }) 

  socket.on("accessTokenSet", (token) => {
    console.log('got an access token');
    setAcessToken(token);
    console.log('access token is ' + accessToken);
  });

  if (params.access_token && !(accessToken)) {
    // emit to server
    console.log("got an access token!");
    setAcessToken(params.access_token);
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
    
    console.log('in like and sort');
    var tempQueue = [...queue];
    var index = queue.indexOf(item);
    tempQueue[index].likeTot += 1;

    function compare(a, b) {
      if (a.likeTot < b.likeTot) return 1;
      if (b.likeTot < a.likeTot) return -1;
      return 0;
    }

    tempQueue.sort(compare);
    console.log(tempQueue.length);
    socket.emit('updateQueue', {updatedQueue: tempQueue, roomId})
  }
    // setQueue(tempQueue);
  

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
      <p>{params.uuid}</p>
      <SearchBar
        queue={queue}
        setQueue={setQueue}
        socket={socket}
        roomId={params.uuid}
        accessToken={accessToken}
      />
      <SongList queue={queue} setQueue={setQueue} likeAndSort={likeAndSort} socket={socket} />
      <AddToQueueButton queue={queue} setQueue={setQueue} socket={socket} accessToken={accessToken}/>
      <SkipButton queue={queue} setQueue={setQueue} socket={socket} accessToken={accessToken}/>
    </div>
  );
};

export default Player;
