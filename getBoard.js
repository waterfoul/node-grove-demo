//@flow
const Board = require('node-grovepi').GrovePi.board
const Commands = require('node-grovepi').GrovePi.commands
const logger = require('./logger');

module.exports = new Promise((resolve, reject) => {
  const board = new Board({
    debug: true,
    onError: function(err) {
      reject(err);
    },
    onInit: function(res) {
      board.pinMode(2, board.OUTPUT);
      board.writeBytes(Commands.dWrite.concat([
        2,
        0,
        Commands.unused
      ]));
      if (res) {
        logger.info('GrovePi Version :: ' + board.version());
        resolve(board);
      } else {
        reject(new Error('Failed to connect!'));
      }
    }
  });
  board.init();
});