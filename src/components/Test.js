import React, { Component } from 'react';

class Test extends React.Component {

  render() {
    const {name, id} = this.props;
    return(<div>welcome to {name}<br/> you have tried {id}</div>)}
}

export default (Test);
