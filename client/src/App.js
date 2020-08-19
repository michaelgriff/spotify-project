import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import Main from "./pages/Main";
import Player from "./pages/Player";
import CreateRoom from "./pages/CreateRoom";
import About from "./pages/About";

const spotifyWebApi = new Spotify();

const App = () => {
  return (
    <Router>
      <h1>Spotify Share</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/create-room">Create Room</Link>
          </li>
          <li>
            <Link to="/player">Player</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create-room">
          <CreateRoom />
        </Route>
        <Route path="/player">
          <Player />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
