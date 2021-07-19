import React from "react";

import SongListItem from "../components/SongListItem";



const SongList = (props) => {

  props.socket.on("updatedQueueResults", (updatedQueueResults) => {
    console.log("setting the queue from server");
    console.log(updatedQueueResults);
    props.setQueue(updatedQueueResults);
  });

  

  let queueList = props.queue.map((item, index) => {
    return (
      <SongListItem item={item} key={index} likeAndSort={props.likeAndSort} socket={props.socket}/>
    );
  });

  return <ol>{queueList}</ol>;
};

export default SongList;
