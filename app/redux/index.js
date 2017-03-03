//@flow

import { combineReducers } from 'redux';
import led from './led';
import lcd from './lcd';
import light from './light';
import sound from './sound';
import button from './button';
import tempHumi from './tempHumi';
import rotary from './rotary';
import rangeFinder from './rangeFinder';

export default combineReducers({
  led,
  lcd,
  light,
  sound,
  button,
  tempHumi,
  rotary,
  rangeFinder
});