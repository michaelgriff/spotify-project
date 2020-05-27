import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8000");

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      value: "",
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.skipToNext = this.skipToNext.bind(this);
    this.likeAndSort = this.likeAndSort.bind(this);
  }

  searchAdd = (item) => {
    client.send(
      JSON.stringify({
        type: "searchAdd",
        item: item,
      })
    );
  };

  likeSort = (item) => {
    client.send(
      JSON.stringify({
        type: "likeSort",
        item: item,
      })
    );
  };

  remove = () => {
    client.send(
      JSON.stringify({
        type: "remove",
      })
    );
  };

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      if (dataFromServer.type === "searchAdd") {
        if (this.state.queue) {
          this.setState({
            executed: "yes",
            queue: [...this.state.queue, dataFromServer.item],
          });
        } else {
          this.setState({
            executed: "yes",
            queue: [dataFromServer.item],
          });
        }
      } else if (dataFromServer.type === "likeSort") {
        var tempQueue = this.state.queue;
        tempQueue.find(function (element) {
          if (element.uri === dataFromServer.item.uri) {
            element.likeTot++;
          }
        });

        function compare(a, b) {
          if (a.likeTot < b.likeTot) return 1;
          if (b.likeTot < a.likeTot) return -1;
          return 0;
        }

        tempQueue.sort(compare);
        this.setState({ queue: tempQueue });
      } else if (dataFromServer.type === "remove") {
        if (this.state.queue) {
          var tempQueue = this.state.queue;

          if (tempQueue.length === 1) {
            this.setState({ queue: undefined });
          } else {
            tempQueue.shift();
            this.setState({
              queue: tempQueue,
            });
          }
        }
      }
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value, queue: this.state.queue });
  }

  handleSubmit(event) {
    this.setState({ executed: undefined, queue: this.state.queue });
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
      this.setState({
        value: "",
        items: response.tracks.items,
        queue: this.state.queue,
        // this.state.track = response.tracks.items[0].uri;
      });
    });
  };

  addToQueue = (trackURI) => {
    spotifyWebApi.addToQueue(trackURI).then(() => {
      console.log("success");
    });
  };

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response.progress_ms);
    });
  }

  skipToNext() {
    spotifyWebApi.skipToNext().then(() => {
      console.log("skipped");
    });
  }

  likeAndSort = (item) => {
    var tempQueue = this.state.queue;
    var index = this.state.queue.indexOf(item);
    tempQueue[index].likeTot++;

    function compare(a, b) {
      if (a.likeTot < b.likeTot) return 1;
      if (b.likeTot < a.likeTot) return -1;
      return 0;
    }

    tempQueue.sort(compare);
    this.setState({ queue: tempQueue });
  };

  render() {
    var itemList = undefined;
    var queueList = undefined;
    var text = undefined;

    if (this.state.queue) {
      const queue = this.state.queue;
      queueList = queue.map((item, index) => {
        return (
          <li key={index}>
            <p>{item.name}</p>
            <p>{item.likeTot}</p>
            <button
              onClick={() => {
                this.likeSort(item);
              }}
            >
              Like
            </button>
          </li>
        );
      });
    }

    const realList = (aList) => {
      return (
        <div>
          <ol>{aList}</ol>
        </div>
      );
    };

    if (this.state.items) {
      const items = this.state.items;
      text = "Search Results: ";
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
    }

    const searchResults = (aList, text) => {
      return (
        <div>
          <p>{text}</p>
          <ol>{aList}</ol>
        </div>
      );
    };

    if (this.state.executed) {
      itemList = undefined;
      text = undefined;
    }

    return (
      <div>
        <a href="http://localhost:8888">
          <button>Login With Spotify</button>
        </a>
        <button
          onClick={() => {
            this.remove();
            this.addToQueue(this.state.queue[0].uri);
          }}
        >
          Add To Queue
        </button>
        <button onClick={() => this.skipToNext()}>Skip to Next</button>

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

        {searchResults(itemList, text)}
        {realList(queueList)}
      </div>
    );
  }
}

export default App;
