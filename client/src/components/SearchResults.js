import React from "react";

const SearchResults = (props) => {
  const items = props.items;
  itemList = items.map((item, index) => {
    return (
      <li key={index}>
        <button
          onClick={() => {
            item.likeTot = 0;
            this.searchAdd(item);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });
};

export default SearchResults;
