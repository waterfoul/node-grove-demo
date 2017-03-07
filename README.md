This is a demo of reading sensors and controlling gadgets using the grove pi hat
and node. To use this you need a raspberry pi (I used a RPI 2) and the grove pi
hat which can be found [here](https://www.dexterindustries.com/grovepi/)

**Technologies used**
* [node-grovepi](https://www.npmjs.com/package/node-grovepi) For reading most sensors and gadgets
* [johnny-five](https://www.npmjs.com/package/johnny-five) For controlling the LCD
* [express](https://www.npmjs.com/package/express) For posting updates to sensors
* [sockjs](https://www.npmjs.com/package/sockjs) For updating the UI with sensor data
* [react](https://www.npmjs.com/package/react) For UI rendering
* [redux](https://www.npmjs.com/package/redux) For client side data storage

**Setup**
1. Install [Raspbian for Robots](https://github.com/DexterInd/GrovePi.git)
2. Make sure the same code works
3. Update app/components/Home.js to match the components hooked to your grove-pi
   * The default setup is
     * D2 Buzzer
     * D3 Green LED
     * D4 Red LED
     * D5 Button Sensor
     * D6 Blue LED
     * D7 Range Finder
     * D8 Temperature/Humidity Sensor
     * A0 Light Sensor
     * A1 Sound Sensor
     * A2 Rotary Sensor
     * I2C RGB LCD
