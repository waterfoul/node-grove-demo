//@flow

const express = require('express');

const api = express.Router('api');
require('./light');
require('./rotary');
require('./sound');
require('./tempHumi');
require('./rangeFinder');

api.use('/led', require('./led'));
api.use('/lcd', require('./lcd'));
api.use('/buzzer', require('./buzzer'));

module.exports = api;