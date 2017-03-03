// @flow

import axios from 'axios';

export const SET_RGB = 'LCD_SET_RGB';
export const SET_TEXT = 'LCD_SET_TEXT';

export default function lcd(state = {}, action) {
  switch(action.type) {
    case SET_RGB:
      return {
        ...state,
        [action.socket]: {
          ...state[action.socket],
          rgb: action.rgb
        }
      };
    case SET_TEXT:
      return {
        ...state,
        [action.socket]: {
          ...state[action.socket],
          text: action.value
        }
      };
    default:
      return state;
  }
}

var debounceTimeout = -1;

const sendData = (socket) => {
  return (dispatch, getState) => {
    var state = getState();

    if(
      state.lcd[socket].rgb !== undefined &&
      state.lcd[socket].text !== undefined
    ) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        axios.post('/api/lcd/' + socket, state.lcd[socket]);
      }, 1000);
    }
  }
};

export const setRgb = (socket, rgb, hex) => {
  return (dispatch) => {
    dispatch({
      type: SET_RGB,
      socket,
      rgb,
      hex
    });
    dispatch(sendData(socket));
  };
};

export const setText = (socket, value) => {
  return (dispatch) => {
    dispatch({
      type: SET_TEXT,
      socket,
      value
    });
    dispatch(sendData(socket));
  };
};
