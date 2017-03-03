//@flow

import React from 'react';
import {connect} from 'react-redux';
import { SketchPicker } from 'react-color';

import {setRgb, setText} from '../redux/lcd';

export const Lcd = ({status, socket, setRgb, setText}) => (
  <div id="lcd" className="container-fluid">
    Lcd Socket {socket}&nbsp;
    <label>
      Color: <SketchPicker color={status.rgb} onChange={setRgb} />
    </label>&nbsp;
    <label>
      Text: <textarea type="text" value={status.value} onChange={setText} />
    </label>
  </div>
);

const mapStateToProps = ({lcd}, {socket}) => ({
  socket,
  status: lcd[socket] || {}
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  setRgb: (e) => {
    dispatch(setRgb(socket, e.rgb));
  },
  setText: (e) => {
    dispatch(setText(socket, e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (Lcd);