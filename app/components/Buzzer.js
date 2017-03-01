//@flow

import React from 'react';
import {connect} from 'react-redux';

import {Beep} from '../redux/buzzer';

export const Buzzer = ({socket, beep}) =>  (
  <div id="led" className="container-fluid">
    <label>
      Buzzer Socket {socket}&nbsp;
      <button onClick={() => beep(socket)}>Beep</button>
    </label>&nbsp;
  </div>
);

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = (dispatch) => ({
  beep: (socket) => {
    dispatch(Beep(socket));
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Buzzer);