//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setRed, setGreen, setBlue, setText} from '../redux/lcd';

export const Lcd = ({status, socket, setRed, setGreen, setBlue, setText}) => (
  <div id="lcd" className="container-fluid">
    Lcd Socket {socket}&nbsp;
    <label>
      Red: <input type="number" value={status.r} onChange={setRed}/>
    </label>&nbsp;
    <label>
      Green: <input type="number" value={status.g} onChange={setGreen}/>
    </label>&nbsp;
    <label>
      Blue: <input type="number" value={status.b} onChange={setBlue}/>
    </label>&nbsp;
    <label>
      Text: <textarea type="text" value={status.text} onChange={setText}/>
    </label>
  </div>
);

const mapStateToProps = ({lcd}, {socket}) => ({
  socket,
  status: lcd[socket] || {}
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  setRed: (e) => {
    dispatch(setRed(socket, e.target.value));
  },
  setGreen: (e) => {
    dispatch(setGreen(socket, e.target.value));
  },
  setBlue: (e) => {
    dispatch(setBlue(socket, e.target.value));
  },
  setText: (e) => {
    dispatch(setText(socket, e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (Lcd);