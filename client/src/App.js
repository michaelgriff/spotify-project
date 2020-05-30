import React from "react";
import Spotify from "spotify-web-api-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { spotifyAuthContext } from './contexts/spotifyAuthContext';

import Main from "./pages/Main";
import Player from './pages/Player';
import CreateRoom from './pages/CreateRoom';
import About from "./pages/About";

import getHashParams from './utils/getHashParams';

const spotifyWebApi = new Spotify();

const App = () => {

  const params = getHashParams(window);
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <spotifyAuthContext.Provider value={{spotifyWebApi}}>
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
    </spotifyAuthContext.Provider>
  );
};

export default App;
