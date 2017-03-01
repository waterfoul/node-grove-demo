//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {subscribe} from '../redux/button';


export class Button extends Component {
  constructor(props) {
    super(props);
    props.subscribe();
  }

  render() {
    const {socket, value} = this.props;

    return (
      <div className="container-fluid">
        Button Socket {socket}:&nbsp;
        <span
          style={{
            backgroundColor: value ? 'black' : 'white',
            border: '1px solid black',
            borderRadius: '50%',
            width: '7px',
            height: '7px',
            display: 'inline-block'
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({button}, {socket}) => ({
  socket,
  value: button[socket]
});

const mapDispatchToProps = (dispatch, {socket}) => ({
  subscribe: () => dispatch(subscribe(socket))
});

export default connect(mapStateToProps, mapDispatchToProps) (Button);