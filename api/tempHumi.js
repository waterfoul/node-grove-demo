//@flow
// Digital Input
// http://wiki.seeed.cc/Grove-TemperatureAndHumidity_Sensor/

const DHTDigitalSensor = require('node-grovepi').GrovePi.sensors.DHTDigital;
const socket = require('../socket');

const subs = {};
const sensors = {};
let oldValue = null;

socket.onSubscribe('tempHumi', (client, channel) => {
  //Trigger the next update to be sent
  oldValue = null
  if(!subs[channel] || subs[channel].length === 0) {
    subs[channel] = [];

    sensors[channel] = new DHTDigitalSensor(channel);
    sensors[channel].stream(1000, (value) => {
      if(
        !oldValue ||
        value[0] !== oldValue[0] ||
        value[1] !== oldValue[1]
      ) {
        oldValue = value;

        const data = JSON.stringify({
          channel,
          name: 'tempHumi',
          value: {
            temp: value[0],
            humi: value[1],
            heatIdx: value[2]
          }
        });
        subs[channel].forEach((sub) => sub.write(data));
      }
    });
  }

  subs[channel].push(client);
});