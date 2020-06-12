import React, { useState } from "react";

const SongList = () => {
  const [state, setState] = useState({ queue: [] });

  const likeAndSort = (item) => {
    var tempQueue = state.queue;
    var index = state.queue.indexOf(item);
    tempQueue[index].likeTot++;

    function compare(a, b) {
      if (a.likeTot < b.likeTot) return 1;
      if (b.likeTot < a.likeTot) return -1;
      return 0;
    }

    tempQueue.sort(compare);
    setState({ queue: tempQueue });
  };

  const queue = state.queue;
  let queueList = queue.map((item, index) => {
    return (
      <li key={index}>
        <p>{item.name}</p>
        <p>{item.likeTot}</p>
        <button
          onClick={() => {
            likeAndSort(item);
          }}
        >
          Like
        </button>
      </li>
    );
  });

  const realList = (aList) => {
    return (
      <div>
        <ol>{aList}</ol>
      </div>
    );
  };

  return <div>{realList(queueList)}</div>;
};

export default SongList;
