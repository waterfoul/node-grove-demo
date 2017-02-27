/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const path = require('path');

const api = require('./api');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/favicon.ico', (req, res) => res.redirect('/static/favicon.ico'));

app.use('/api', api);

const indexFile = path.join(__dirname, 'static', 'index.html')
app.get('*', (req, res) => {
  res.sendFile(indexFile);
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;