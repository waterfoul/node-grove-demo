//@flow

import React from 'react';

import Led from './Led';
import Lcd from './Lcd';
import Buzzer from './Buzzer';
import Light from './Light';
import Button from './Button';
import Sound from './Sound';
import TempHumi from './TempHumi';
import Rotary from './Rotary';
import RangeFinder from './RangeFinder';

const Home = () => (
  <div id="home" className="container-fluid">
          <Led color="Green" socket="3" />
          <Led color="Red" socket="4" />
          <Led color="Blue" socket="6" />
          <Buzzer socket="2" />
          <Light socket="0" darkVal="400"/>
          <Sound socket="1" loudVal="1000"/>
          <Button socket="5"/>
          <TempHumi socket="8"/>
          <Rotary socket="2"/>
          <RangeFinder socket="7"/>
          <Lcd socket="2"/>
  </div>
);

export default Home;