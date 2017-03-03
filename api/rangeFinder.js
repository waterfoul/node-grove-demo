//@flow
// Digital Input
// http://wiki.seeed.cc/Grove-TemperatureAndHumidity_Sensor/

const UltrasonicDigitalSensor = require('node-grovepi').GrovePi.sensors.UltrasonicDigital;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;

socket.onSubscribe('rangeFinder', (client, channel) => {
  //Trigger the next update to be sent
  oldValue = null;
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new UltrasonicDigitalSensor(channel);
    sensors[channel].stream(1000, (value) => {
      if(value !== oldValue) {
        oldValue = value;

        const data = JSON.stringify({
          channel,
          name: 'rangeFinder',
          value
        });
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }

  subs[channel].push(client);
});