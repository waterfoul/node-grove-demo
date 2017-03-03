//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/rangeFinder';


export class RangeFinder extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, value} = this.props;

    return (
      <div className="container-fluid">
        Range Finder {socket}: {value}cm
      </div>
    );
  }
}

const mapStateToProps = ({rangeFinder}, {socket}) => ({
  socket,
  value: rangeFinder[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (RangeFinder);