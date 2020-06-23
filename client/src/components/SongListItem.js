import React from "react";

const SongListItem = (props) => {
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
