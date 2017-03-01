// @flow

import axios from 'axios';

export const Beep = (socket) => {
  return () => {
    axios.post('/api/buzzer/' + socket)
  }
};