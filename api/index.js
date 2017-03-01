//@flow

const express = require('express');

const api = express.Router('api');
require('./light');
require('./button');

api.use('/led', require('./led'));
api.use('/buzzer', require('./buzzer'));

module.exports = api;