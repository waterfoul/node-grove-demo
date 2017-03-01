//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/sound';


export class Sound extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, loudVal, value} = this.props;

    return (
      <div className="container-fluid">
        Sound Socket {socket}:&nbsp;
        <span style={{
          border: '1px solid black',
          display: 'inline-block',
          width: '400px',
          height: '6px'
        }}>
          <div className="dark-bar" style={{
            backgroundColor: 'gray',
            height: '100%',
            width: (value / loudVal * 100) + '%',
            float: 'right'
          }} />
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({sound}, {socket}) => ({
  socket,
  value: sound[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (Sound);