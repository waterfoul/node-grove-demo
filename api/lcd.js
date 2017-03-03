//@flow
// Digital Output

const express = require('express');
const i2c = require('i2c');
const exec = require('exec');

const lcd = express.Router('lcd');

const Raspi = require('raspi-io');
const five = require('johnny-five');

const boardReady = new Promise((resolve) => {
  const board = new five.Board({
    io: new Raspi()
  });

  board.on('ready', () => {
    exec(['avrdude', '-c', 'gpio', '-p', 'm328p'], console.log.bind(console));
    resolve(board);
  });
});

lcd.post('/:socket', (req, res) => {
  boardReady.then(() => {
    const lcd = new five.LCD({
      controller: "JHD1313M1",
      rows: 2,
      columns: 16
    });

    lcd.bgColor(req.body.rgb.r, req.body.rgb.g, req.body.rgb.b);
    const text = req.body.text.split('\n');

    lcd.cursor(0, 0);
    lcd.print(text[0] || '');

    lcd.cursor(1, 0);
    lcd.print(text[1] || '');
  });
  res.sendStatus(200);
});

module.exports = lcd;