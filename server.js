//Import http
const http = require('http');
//Import the app
const app = require('./app');

//Port to be listening
const port = process.env.PORT || 3000;

//Created server with handler
const server = http.createServer(app);

//Start the server listening on the port
server.listen(port);