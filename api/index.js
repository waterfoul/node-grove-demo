//@flow

const express = require('express');

const api = express.Router('api');
require('./light');
require('./button');
require('./sound');

api.use('/led', require('./led'));
api.use('/buzzer', require('./buzzer'));

module.exports = api;