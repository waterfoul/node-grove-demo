//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TurnOn, TurnOff} from '../redux/led';

export const Led = ({socket, color, status, on, off}) => (
  <div id="led" className="container-fluid">
    <label>
      {color} Led Socket {socket}&nbsp;
      <span style={{color: status ? 'black' : 'white'}}>💡</span>&nbsp;
      <button onClick={() => on(socket)}>On</button>&nbsp;
    </label>&nbsp;
    <button onClick={() => off(socket)}>Off</button>
  </div>
);

const mapStateToProps = ({led}, {socket, color}) => ({
  socket,
  color,
  status: led[socket]
});

const mapDispatchToProps = (dispatch) => ({
  on: (socket) => {
    dispatch(TurnOn(socket));
  },
  off: (socket) => {
    dispatch(TurnOff(socket));
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Led);