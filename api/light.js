//@flow
// Analog Input

const LightAnalogSensor = require('node-grovepi').GrovePi.sensors.LightAnalog;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;

socket.onSubscribe('light', (client, channel) => {
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new LightAnalogSensor(channel);
    sensors[channel].stream(1000, (value) => {
      if(value !== oldValue) {
        oldValue = value;

        const data = JSON.stringify({channel, name: 'light', value});
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }
  
  subs[channel].push(client);
});
