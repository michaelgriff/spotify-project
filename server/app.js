/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
import Spotify from 'spotify-web-api-js';

const http = require('http');
const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');

const spotifyAuthorizationRouter = require('./routes/spotifyAuthorization');

const PORT = 8888;

// set up express server
const app = express();
const server = http.createServer(app);

// express config and namespacing
app.use(cors()).use(cookieParser());
app.use('/', spotifyAuthorizationRouter);

const spotifyWebApi = new Spotify();

// set up socket io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log(`new websocket connection from ${socket.id}`);

  socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit('chat', message);
  });

  socket.on('accessToken', (accessToken) => {
    spotifyWebApi.setAccessToken(accessToken);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
