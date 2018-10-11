import React, { Component } from 'react';
import {connect} from 'react-redux';

class LoginError extends React.Component {

  render() {
    return(
      <div>
      {this.props.tryies > 3 ?
      <div>max login tryes exceeded</div>:''}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      tryies: state.login.count
    }
}

export default connect(mapStateToProps)(LoginError);
