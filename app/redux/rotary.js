// @flow

import {subscribe as socketSubscribe} from '../socket';

export const VALUE_CHANGE = 'ROTARY_VALUE_CHANGE';

const subscribed = {};

export default function rotary(state = {}, action) {
  switch(action.type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [action.socket]: action.value
      };
    default:
      return state;
  }
}

export const subscribe = (socket) => {
  if(subscribed[socket]) return () => { /* */ };
  subscribed[socket] = true;

  return (dispatch) => {
    socketSubscribe('rotary', parseInt(socket), (value) => {
      dispatch({
        type: VALUE_CHANGE,
        socket: socket,
        value
      })
    })
  }
};