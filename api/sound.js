//@flow
// Analog Input

const AnalogSensor = require('node-grovepi').GrovePi.sensors.base.Analog;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;

function SoundAnalogSensor(pin) {
  AnalogSensor.apply(this, Array.prototype.slice.call(arguments))
}
SoundAnalogSensor.prototype = new AnalogSensor()

SoundAnalogSensor.prototype.read = function() {
  var res = AnalogSensor.prototype.read.call(this)
  return parseInt(res);
};

socket.onSubscribe('sound', (client, channel) => {
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new SoundAnalogSensor(channel);
    sensors[channel].stream(100, (value) => {
      if(value !== oldValue) {
        oldValue = value;

        const data = JSON.stringify({channel, name: 'sound', value});
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }
  
  subs[channel].push(client);
});
