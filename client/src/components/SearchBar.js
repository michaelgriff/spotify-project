import React, { useState } from "react";

import SearchResults from "./SearchResults";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();

  const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    search(spotifyWebApi, query);
    event.preventDefault();
  };

  const search = async (spotifyClient, query) => {
    const response = await spotifyClient.searchTracks(query);
    setResults(response.tracks.items);
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
        />
      ) : null}
    </div>
  );
};

export default SearchBar;
