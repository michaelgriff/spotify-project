import React from "react";

import { spotifyAuthContext } from "./contexts/spotifyAuthContext";

const SearchBar = () => {
  const [state, setState] = useState();

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={state.value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SearchBar;
