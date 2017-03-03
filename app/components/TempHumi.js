//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/tempHumi';


export class TempHumi extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, value} = this.props;

    return (
      <div className="container-fluid">
        DHT Socket {socket}&nbsp;
        Temperature: {value && value.temp}&deg;C&nbsp;
        Humidity: {value && value.humi}%&nbsp;
        Heat Index: {value && value.heatIdx}&nbsp;
      </div>
    );
  }
}

const mapStateToProps = ({tempHumi}, {socket}) => ({
  socket,
  value: tempHumi[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (TempHumi);