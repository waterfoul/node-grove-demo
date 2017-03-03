//@flow
// Analog Input

const AnalogSensor = require('node-grovepi').GrovePi.sensors.base.Analog;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;

const minValue = 0;
const minAngle = -45;
const maxValue = 1023;
const maxAngle = 225;

function Rotary() {
  AnalogSensor.apply(this, Array.prototype.slice.call(arguments))
}

Rotary.prototype = new AnalogSensor();

Rotary.prototype.read = function() {
  const ret = AnalogSensor.prototype.read.apply(this);
  return Math.round((
    (
      (
        (ret - minValue)/maxValue
      ) * (
        maxAngle - minAngle
      )
    ) + minAngle
  ) * 100) / 100;
};

socket.onSubscribe('rotary', (client, channel) => {
  //Trigger the next update to be sent
  oldValue = null;
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new Rotary(channel);
    sensors[channel].stream(100, (value) => {
      if(value !== oldValue) {
        oldValue = value;

        const data = JSON.stringify({channel, name: 'rotary', value});
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }
  
  subs[channel].push(client);
});
