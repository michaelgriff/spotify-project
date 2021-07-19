import React, { useState } from "react";

import SearchResults from "./SearchResults";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();

  props.socket.on("searchResults", (response) => {
    console.log("we received the message");
    setResults(response);
  });
  // const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("called handle submit");
    search(query, props.accessToken);
    setQuery("");
    event.preventDefault();
  };

  const search = async (query, token) => {
    props.socket.emit("search", {query, token});
    // const response = await spotifyClient.searchTracks(query);
    // setResults(response.tracks.items);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={query} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {results ? (
        <SearchResults
          items={results}
          setQueue={props.setQueue}
          queue={props.queue}
          setResults={setResults}
          roomId={props.roomId}
          socket={props.socket}
        />
      ) : null}
    </div>
  );
};

export default SearchBar;
