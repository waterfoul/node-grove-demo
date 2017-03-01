//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/light';


export class Light extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, darkVal, value} = this.props;

    return (
      <div className="container-fluid">
        Light Socket {socket}:&nbsp;
        <span style={{
          border: '1px solid black',
          display: 'inline-block',
          width: '400px',
          height: '6px'
        }}>
          <div className="dark-bar" style={{
            backgroundColor: 'gray',
            height: '100%',
            width: (value / darkVal * 100) + '%'
          }} />
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({light}, {socket}) => ({
  socket,
  value: light[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (Light);