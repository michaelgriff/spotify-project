import React from "react";

const SongListItem = (props) => {
  props.socket.on('likeAndSortResult', (queue) => {
    console.log('liked and sorted');
    props.setQueue(queue);
  })
  return (
    <li key={props.index}>
      <p>{props.item.name}</p>
      <p>{props.item.likeTot}</p>
      <button
        onClick={() => {
          props.likeAndSort(props.item);
        }}
      >
        Like
      </button>
    </li>
  );
};

export default SongListItem;
