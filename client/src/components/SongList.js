import React from "react";

import SongListItem from "../components/SongListItem";

const SongList = (props) => {
  const queue = props.queue;

  let queueList = props.queue.map((item, index) => {
    return (
      <SongListItem item={item} key={index} likeAndSort={props.likeAndSort} />
    );
  });

  return <ol>{queueList}</ol>;
};

export default SongList;
