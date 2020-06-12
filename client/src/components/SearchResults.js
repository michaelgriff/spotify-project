import React from "react";

const SearchResults = (props) => {
  const items = props.items;
  let itemList = items.map((item, index) => {
    return (
      <li key={index}>
        <button
          onClick={() => {
            item.likeTot = 0;
            props.setQueue([...props.queue, item]);
            props.setResults(null);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });

  const searchResults = (aList) => {
    return (
      <div>
        <p>Search Results:</p>
        <ol>{aList}</ol>
      </div>
    );
  };

  return <div>{searchResults(itemList)}</div>;
};

export default SearchResults;

//objects: empty containers, key-value stores
// object keys are always strings / ids
// object values are one of two things:
// 1. property --> value
// 2. method --> function
