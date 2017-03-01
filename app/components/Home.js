//@flow

import React from 'react';

import Led from './Led';
import Buzzer from './Buzzer';
import Light from './Light';
import Button from './Button';
import Sound from './Sound';

const Home = () => (
  <div id="home" className="container-fluid">
    <Led color="Green" socket="3" />
    <Led color="Red" socket="4" />
    <Led color="Blue" socket="6" />
    <Buzzer socket="2" />
    <Light socket="0" darkVal="400"/>
    <Sound socket="1" loudVal="1000"/>
    <Button socket="5"/>
  </div>
);

export default Home;