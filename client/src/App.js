import React from "react";
import Spotify from "spotify-web-api-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { spotifyAuthContext } from './contexts/spotifyAuthContext';

import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";

import getHashParams from './utils/getHashParams';

const spotifyWebApi = new Spotify();

const App = () => {
  // we need to get the parameters of the 
  const params = getHashParams(window);
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <spotifyAuthContext.Provider value={spotifyWebApi}>
      <Router>
        <h1>{params.access_token}</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </spotifyAuthContext.Provider>
  );
};

export default App;
