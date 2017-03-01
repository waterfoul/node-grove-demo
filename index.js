//@flow

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const path = require('path');
const uuid = require('node-uuid');
const http = require('http');

const api = require('./api');
const logger = require('./logger');
const socket = require('./socket');

const app = express();
const server = http.createServer(app);
socket.server.installHandlers(server, {prefix:'/socket'});

app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(expressWinston.logger({
  winstonInstance: logger
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: uuid.v4(), // Generate a random uuid for the secret since we are running a single server only. This way the secret it only stored in memory
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUnitialized: false
}));

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/favicon.ico', (req, res) => res.redirect('/static/favicon.ico'));

app.use('/api', api);

const indexFile = path.join(__dirname, 'static', 'index.html');
app.get('*', (req, res) => {
  res.sendFile(indexFile);
});

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  logger.info('App is running', {port: app.get('port'), env: app.get('env')});
});

module.exports = app;