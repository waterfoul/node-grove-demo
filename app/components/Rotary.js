//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/rotary';


export class Rotary extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, value} = this.props;

    return (
      <div className="container-fluid">
        Rotary Socket {socket}:&nbsp;
        <span
          style={{
            display: 'inline-block',
            transform: `rotate(${value}deg)`
          }}
        >&#8615;</span>&nbsp;
        {value}&deg;
      </div>
    );
  }
}

const mapStateToProps = ({rotary}, {socket}) => ({
  socket,
  value: rotary[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (Rotary);