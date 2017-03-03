//@flow
// Digital Output

const express = require('express');
const i2c = require('i2c');

const lcd = express.Router('lcd');

const Raspi = require('raspi-io');
const five = require('johnny-five');

const boardReady = new Promise((resolve) => {
  const board = new five.Board({
    io: new Raspi()
  });

  board.on('ready', () => {
    resolve(board);
  });
});

lcd.post('/:socket', (req, res) => {
  boardReady.then(() => {
    const lcd = new five.LCD({
      controller: "JHD1313M1"
    });

    lcd.bgColor(req.body.r, req.body.g, req.body.b);
    lcd.print(req.body.text);
  });
  res.sendStatus(200);
});

module.exports = lcd;