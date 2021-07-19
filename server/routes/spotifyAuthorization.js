const { Router } = require('express');
const request = require('request'); // "Request" library
const querystring = require('querystring');

const { v4: uuidv4 } = require('uuid');

const generateRandomString = require('../utils/generateRandomString');
const envVars = require('../env/production');

const clientId = envVars.SPOTIFY_PUBLIC; // Your client id
const clientSecret = envVars.SPOTIFY_SECRET; // Your secret
const redirectUri = 'http://localhost:8888/callback'; // Your redirect uri
const stateKey = 'spotify_auth_state';

const router = Router();
router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      state,
    })}`,
  );
});

router.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      `/#${querystring.stringify({
        error: 'state_mismatch',
      })}`,
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: `Bearer ${accessToken}` },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
        });

        // DO THAT HERE
        // store access token, refresh token, and uuid in the db and then redirect with juust the uuid

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `http://localhost:3000/player#${querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            uuid: uuidv4(),
          })}`,
        );
      } else {
        res.redirect(
          `/#${querystring.stringify({
            error: 'invalid_token',
          })}`,
        );
      }
    });
  }
});

router.get('/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      res.send({
        access_token: accessToken,
      });
    }
  });
});

module.exports = router;
