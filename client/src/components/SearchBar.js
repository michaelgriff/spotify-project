import React, { useState } from "react";

import SearchResults from "./SearchResults";

import { spotifyAuthContext } from "../contexts/spotifyAuthContext";

const SearchBar = () => {
  const [state, setState] = useState({ value: "" });

  const { spotifyWebApi } = React.useContext(spotifyAuthContext);

  const handleChange = (event) => {
    setState({ value: event.target.value });
  };

  const handleSubmit = (event) => {
    search(spotifyWebApi, state.value);
    event.preventDefault();
  };

  const search = async (spotifyClient, query) => {
    await spotifyClient.searchTracks(query).then((response) => {
      setState({
        items: response.tracks.items,
      });
    });
    alert("searched");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={state.value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {state.items ? <SearchResults items={state.items} /> : null}
      {/* <SearchResults items={state.items} /> */}
    </div>
  );
};

export default SearchBar;
