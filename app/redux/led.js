// @flow

import axios from 'axios';

export const TURN_ON = 'LED_TURN_ON';
export const TURN_OFF = 'LED_TURN_OFF';

export default function led(state = {}, action) {
  switch(action.type) {
    case TURN_ON:
      return {
        ...state,
        [action.socket]: true
      };
    case TURN_OFF:
      return {
        ...state,
        [action.socket]: false
      };
    default:
      return state;
  }
}

export const TurnOn = (socket) => {
  return (dispatch) => {
    axios.post('/api/led/' + socket, {lit: true})
      .then(() => {
        dispatch({
          type: TURN_ON,
          socket: socket
        })
      })
  }
};

export const TurnOff = (socket) => {
  return (dispatch) => {
    axios.post('/api/led/' + socket, {lit: false})
      .then(() => {
        dispatch({
          type: TURN_OFF,
          socket: socket
        })
      })
  }
};