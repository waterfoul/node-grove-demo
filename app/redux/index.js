//@flow

import { combineReducers } from 'redux';
import led from './led';
import light from './light';
import button from './button';

export default combineReducers({
  led,
  light,
  button
});