// @flow

import axios from 'axios';

export const SET_RED = 'LCD_SET_RED';
export const SET_GREEN = 'LCD_SET_GREEN';
export const SET_BLUE = 'LCD_SET_BLUE';
export const SET_TEXT = 'LCD_SET_TEXT';

export default function lcd(state = {}, action) {
  switch(action.type) {
    case SET_RED:
      return {
        ...state,
        [action.socket]: {
          ...state[action.socket],
          r: action.value
        }
      };
    case SET_GREEN:
      return {
        ...state,
        [action.socket]: {
          ...state[action.socket],
          g: action.value
        }
      };
    case SET_BLUE:
      return {
        ...state,
        [action.socket]: {
          ...state[action.socket],
          b: action.value
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

const sendData = (socket) => {
  return (dispatch, getState) => {
    var state = getState();

    if(
      state.lcd[socket].r !== undefined &&
      state.lcd[socket].g !== undefined &&
      state.lcd[socket].b !== undefined &&
      state.lcd[socket].text !== undefined
    ) {
      axios.post('/api/lcd/' + socket, state.lcd[socket]);
    }
  }
};

export const setRed = (socket, value) => {
  return (dispatch) => {
    dispatch({
      type: SET_RED,
      socket,
      value
    });
    dispatch(sendData(socket));
  };
};

export const setGreen = (socket, value) => {
  return (dispatch) => {
    dispatch({
      type: SET_GREEN,
      socket,
      value
    });
    dispatch(sendData(socket));
  };
};

export const setBlue = (socket, value) => {
  return (dispatch) => {
    dispatch({
      type: SET_BLUE,
      socket,
      value
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