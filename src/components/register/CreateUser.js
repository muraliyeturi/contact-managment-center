import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './CreateUser.css';

import api from '../../common/apiConfig';
import constants from '../../common/constants';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import ReactPasswordStrength from 'react-password-strength/dist/universal';
import 'react-password-strength/dist/style.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '95%'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreateUser extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      validEmail: true
    };
  }

  createUserSubmit = () => {
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.email ||
      !this.state.password
    ) {
      NotificationManager.warning(
        'error',
        'Please fill required details',
        3000
      );
      alert('enter required information');
    } else {
      const _this = this;
      let headers = {
        'Content-Type': 'application/json',
        token: window.localStorage.getItem('currentUser')
      };
      axios
        .post(
          api.url + api.user,
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          },
          { headers: headers }
        )
        .then(function(response) {
          _this.setState({ message: response.data.message });
          if (response.data.status) {
            setTimeout(function() {
              _this.props.sendData(_this.state.email);
            }, 1000);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    this.validate(name, value);
  };

  validate = (name, value) => {
    switch (name) {
      case 'email':
        let isValideEmail = value.match(
          new RegExp(
            '^\\w+([\\.-]?\\w+)*(\\b@' + constants.emailDomain + '\\b)+$'
          )
        );
        this.setState({ validEmail: isValideEmail === null });
        break;
    }
  };

  passwordValid = validPassword => {
    if (validPassword.isValid) {
      this.setState({ password: validPassword.password });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.message}
        <FormControl
          aria-describedby="enter first name"
          error={!this.state.firstName}
          className={classes.formControl}
        >
          <InputLabel htmlFor="firstname-error">First Name</InputLabel>
          <Input
            id="firstname-error"
            value={this.state.firstName}
            onChange={this.handleChange}
            name="firstName"
          />
          {!this.state.firstName ? (
            <FormHelperText id="username-error-text">
              Enter First name
            </FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        <FormControl
          aria-describedby="enter last name"
          error={!this.state.lastName}
          className={classes.formControl}
        >
          <InputLabel htmlFor="lastname-error">Last name</InputLabel>
          <Input
            id="lastname-error"
            value={this.state.lastName}
            onChange={this.handleChange}
            name="lastName"
          />
          {!this.state.lastName ? (
            <FormHelperText id="lastname-error-text">
              Enter last name
            </FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        <FormControl
          aria-describedby="enter email"
          error={this.state.validEmail}
          className={classes.formControl}
        >
          <InputLabel htmlFor="email-error">Email(User Name)</InputLabel>
          <Input
            id="email-error"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          />
          {this.state.validEmail ? (
            <FormHelperText id="email-error-text">
              Enter email ending with <b>{constants.emailDomain}</b>
            </FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        <FormControl
          aria-describedby="enter password"
          error={!this.state.validpassword}
          className={classes.formControl}
        >
          <InputLabel htmlFor="password-error">Password</InputLabel>
          <ReactPasswordStrength
            className="passwordField"
            style={{ display: 'block' }}
            minLength={8}
            minScore={2}
            scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
            changeCallback={this.passwordValid}
            inputProps={{
              name: 'password_input',
              autoComplete: 'off',
              className: 'form-control',
              placeholder: 'password'
            }}
          />
          {!this.state.password ? (
            <FormHelperText id="password-error-text">
              Enter Password
            </FormHelperText>
          ) : (
            ''
          )}
        </FormControl>

        <span>
          <Button
            color="primary"
            variant="contained"
            component="span"
            className={classes.button}
            onClick={this.createUserSubmit}
          >
            Sign Up
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            component="span"
            className={classes.button}
          >
            return to login
          </Button>
        </span>
        <NotificationContainer />
      </div>
    );
  }
}

export default withStyles(styles)(CreateUser);
