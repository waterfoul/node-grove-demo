//@flow
// Digital Input

const DigitalSensor = require('node-grovepi').GrovePi.sensors.base.Digital;
const commands = require('node-grovepi').GrovePi.commands;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;


function Button() {
  DigitalSensor.apply(this, Array.prototype.slice.call(arguments))
}

Button.prototype = new DigitalSensor()

Button.prototype.read = function() {
  const write = this.board.writeBytes(commands.dRead.concat([this.pin, commands.unused, commands.unused]))

  if (write) {
    this.board.wait(100)
    return this.board.readByte()[0] === 1;
  } else {
    return false
  }
};

socket.onSubscribe('button', (client, channel) => {
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new Button(channel);
    sensors[channel].stream(100, (value) => {
      if(value !== oldValue) {
        oldValue = value;

        const data = JSON.stringify({channel, name: 'button', value});
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }
  
  subs[channel].push(client);
});
