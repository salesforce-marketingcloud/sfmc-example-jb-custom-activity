var express = require('express'),
  app = express(),
  // 'process.env.PORT' is the PORT Heroku wants us to run on.
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('public'))

var router = require('./router');
router(app, express);

const server = app.listen(port);

server.keepAliveTimeout = 61 * 1000;
server.on('connection', function(socket) {
  // 30 second timeout. Change this as you see fit.
  socket.setTimeout(60 * 1000);
});

console.log("server start on port: " + port);
