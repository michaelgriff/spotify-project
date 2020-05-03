import React, { Component } from "react";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      value: "",
      items: [, ,],
    };
    if (params.access_token) {
      console.log("set access token");
      spotifyWebApi.setAccessToken(params.access_token);
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.search(this.state.value);
    event.preventDefault();
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  search = (query) => {
    spotifyWebApi.searchTracks(query).then((response) => {
      var items = response.tracks.items;
      this.state.items = items;
      console.log(this.state.items);
    });
  };

  render() {
    const addToQueue = (trackURI) => {
      spotifyWebApi.addToQueue(trackURI).then((response) => {
        console.log(response);
      });
    };
    return (
      <div>
        <a href="http://localhost:8888">
          <button>Login With Spotify</button>
        </a>

        <button onClick={addToQueue}>add to queue</button>
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
      </div>
    );
  }
}

export default App;

// import React, { Component } from "react";

// import "./App.css";
// // import Spotify from "spotify-web-api-js";

// // const spotifyWebApi = new Spotify();

// class App extends Component {
//   constructor() {
//     super();
//     const params = this.getHashParams();
//     this.state = {
//       nowPlaying: {
//         name: "Michael",
//       },
//     };
//     if (params.access_token) {
//       console.log("set access token");
//       // spotifyWebApi.setAccessToken(params.access_token);
//     }
//   }

//   getHashParams() {
//     var hashParams = {};
//     var e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

//   getNowPlaying() {
//     console.log("hihi");
//     this.setState({
//       nowPlaying: {
//         name: "hi",
//         image: "hi",
//       },
//     });
//     // spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
//     // });
//   }

//   addSongToQueue() {
//     var trackURI = "spotify:track:1F1QmI8TMHir9SUFrooq5F";
//     console.log("added song to queue");
//     // spotifyWebApi.addToQueue(trackURI).then((response) => {
//     //   console.log(response);
//     //   console.log("success");
//     // });
//   }

//   render() {
//     return (
//       <div className="App">
//         <a href="http://localhost:8888">
//           <button>Login With Spotify</button>
//         </a>
//         <p>{this.state.nowPlaying.name}</p>

//         <button onClick={() => this.getNowPlaying}>Add Song to Queue</button>
//       </div>
//     );
//   }
// }

// export default App;
