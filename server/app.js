/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
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

// set up socket io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log(`new websocket connection from ${socket.id}`);
  socket.emit('message', 'welcome to our application');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
