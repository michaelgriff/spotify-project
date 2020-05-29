import React, { Component } from "react";

import { spotifyAuthContext } from './contexts/spotifyAuthContext';

class SearchBar extends Component {
  handleChange(event) {
    // this.setState({ value: event.target.value, queue: this.state.queue });
  }

  handleSubmit(event) {
    // this.setState({ executed: undefined, queue: this.state.queue });
    // this.search(this.state.value);
    this.search("search");
    event.preventDefault();
  }

  search = (query) => {
    // spotifyWebApi.searchTracks(query).then((response) => {
    //   this.setState({
    //     value: "",
    //     items: response.tracks.items,
    //     queue: this.state.queue,
    //   });
    // });
    alert("searched");
  }

  render() {
    <spotifyAuthContext.Consumer>
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    </spotifyAuthContext.Consumer>
  }
}

export default SearchBar;
