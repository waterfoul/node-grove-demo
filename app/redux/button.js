// @flow

import {subscribe as socketSubscribe} from '../socket';

export const VALUE_CHANGE = 'BUTTON_VALUE_CHANGE';

const subscribed = {};

export default function button(state = {}, action) {
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
    socketSubscribe('button', parseInt(socket), (value) => {
      dispatch({
        type: VALUE_CHANGE,
        socket: socket,
        value
      })
    })
  }
};