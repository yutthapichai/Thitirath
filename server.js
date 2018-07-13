const app  = require('./nodejs/app');
const http = require('http');

const server = http.createServer(app);
const port   = process.env.PORT || 4000;
server.listen( port, () => {
  console.log("Server started port " + port);
});
