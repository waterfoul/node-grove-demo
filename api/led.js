//@flow
// Digital Output

const express = require('express');
const Commands = require('node-grovepi').GrovePi.commands
const getBoard = require('../getBoard');

const led = express.Router('led');

led.post('/:socket', (req, res) => {
  return getBoard.then((board) => {
    const socket = parseInt(req.params.socket);
    board.pinMode(socket, board.OUTPUT);
    board.writeBytes(Commands.dWrite.concat([
      socket,
      req.body.lit ? 1 : 0,
      Commands.unused
    ]));
    res.sendStatus(200);
  });
});

module.exports = led;