/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const axios = require('axios');
const http = require('http');
const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const { query } = require('./utils/db');

const spotifyAuthorizationRouter = require('./routes/spotifyAuthorization');

const PORT = 8888;

// Helper function to easily import env vars
require('dotenv').config();

// set up express server
const app = express();
const server = http.createServer(app);

// express config and namespacing
app.use(cors()).use(cookieParser());
app.use('/', spotifyAuthorizationRouter);

// const spotifyWebApi = new Spotify();

// set up socket io
const io = socketio(server);
io.on('connection', (socket) => {
  let roomAccessToken;
  console.log(`new websocket connection from ${socket.id}`);

  socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    io.to(room).emit('newUser');
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit('chat', message);
  });

  socket.on('accessToken', (accessToken) => {
    console.log('ye');
    roomAccessToken = accessToken;
    socket.emit('accessTokenSet', accessToken);
    // spotifyWebApi.setAccessToken(accessToken);
  });

  socket.on('search', async (data) => {
    const { query, token } = data;
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
      headers: { 'Authorization': `Bearer ${token}` },
    };

    let response = await axios(config);
    console.log(response.data);
    socket.emit('searchResults', response.data.tracks.items);
  });

  socket.on('skip', async (token) => {
    const config = {
      method: 'post',
      url: 'https://api.spotify.com/v1/me/player/next',
      headers: { 'Authorization': `Bearer ${token}` },
    };

    await axios(config);
    socket.emit('skipped');
  });

  socket.on('addToQueue', async (data) => {
    const { trackURI, token } = data;
    console.log(trackURI);
    const config = {
      method: 'post',
      url: `https://api.spotify.com/v1/me/player/queue?uri=${trackURI}`,
      headers: { 'Authorization': `Bearer ${token}` },
    };

    await axios(config);
    socket.emit('added');
  });

  socket.on('updateQueue', (data) => {
    console.log('sending updating queue message');
    const { updatedQueue, roomId } = data;
    console.log(updatedQueue);
    io.to(roomId).emit('updatedQueueResults', updatedQueue);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const testmethod = async () => {
  console.log('about to call db');
  const foo = await query('SELECT * from rooms');
  console.log('query results');
  console.log(foo);
};

testmethod();
