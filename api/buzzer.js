//@flow

const express = require('express');
const Commands = require('node-grovepi').GrovePi.commands
const getBoard = require('../getBoard');

const led = express.Router('buzzer');

led.post('/:socket', (req, res) => {
  return getBoard.then((board) => {
    const socket = parseInt(req.params.socket);
    board.pinMode(socket, board.OUTPUT);
    board.writeBytes(Commands.dWrite.concat([
      socket,
      1,
      Commands.unused
    ]));
    setTimeout(() => {
      board.writeBytes(Commands.dWrite.concat([
        socket,
        0,
        Commands.unused
      ]));
      res.sendStatus(200);
    }, 10);
  });
});

module.exports = led;