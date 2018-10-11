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

import api from '../../common/apiConfig';
import constants from '../../common/constants';
import axios from 'axios';

import Group from '../Group.js';
import queryString from 'query-string';

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

class Contact extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      employeeState: true,
      firstName: '',
      lastName: '',
      email: '',
      groupId: '',
      mode: 'add'
    };
  }

  getGroupById =(groupId) => {
    let _this = this;
    if (groupId != null) {
      let headers = {
        'Content-Type': 'application/json',
        token: window.localStorage.getItem('currentUser')
      };
      axios
        .get(api.url + api.group + '/' + groupId, { headers: headers })
        .then(function(response) {
          console.log(response);
          _this.setState({
            groupName: response.data[0].groupName,
          });
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }

  componentDidMount() {
    let _this = this;
    let contactId = this.props.match.params.contactId;
    if (contactId != null) {
      let headers = {
        'Content-Type': 'application/json',
        token: window.localStorage.getItem('currentUser')
      };
      axios
        .get(api.url + api.contact + '/' + contactId, { headers: headers })
        .then(function(response) {
          _this.setState({
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            email: response.data[0].email,
            employeeState: response.data[0].contactActiveStatus,
            groupId: response.data[0].groupId,
            contactId: contactId,
            mode: 'update'
          });
          _this.getGroupById(response.data[0].groupId)
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }

  updateContactSubmit = () => {
    const _this = this;
    let headers = {
      'Content-Type': 'application/json',
      token: window.localStorage.getItem('currentUser')
    };
    axios
      .put(
        api.url + api.contact + '/' + _this.state.contactId,
        {
          firstName: _this.state.firstName,
          lastName: _this.state.lastName,
          email: _this.state.email,
          groupId: _this.state.groupId,
          contactActiveStatus: _this.state.employeeState
        },
        { headers: headers }
      )
      .then(function(response) {
        _this.setState({ message: response.data.message });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  submitHandler = () => {
    this.props.sendData(this.state.username);
  };

  addContactSubmit = () => {
    const _this = this;
    let headers = {
      'Content-Type': 'application/json',
      token: window.localStorage.getItem('currentUser')
    };
    axios
      .post(
        api.url + api.contact,
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          groupId: this.state.groupId,
          contactActiveStatus: this.state.employeeState
        },
        { headers: headers }
      )
      .then(function(response) {
        _this.setState({ message: response.data.message });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    this.validate(name, value);
  };

  handleContactStatusToggle = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleGroupChange = selectedGroup => {
    console.log(selectedGroup);
    this.setState({ groupId: selectedGroup.selectedGroupId });
  };

  reset = () => {
    this.setState({
      employeeState: true,
      firstName: '',
      lastName: '',
      email: '',
      groupId: ''
    });
  };

  validate = (name, value) => {
    switch (name) {
      case 'email':
        let isValideEmail = value.match(
          new RegExp(
            '^\\w+([\\.-]?\\w+)*(\\b@' + constants.emailDomain + '\\b)+$'
          )
        );
        this.setState({ validUserName: isValideEmail === null });
        break;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="topPadding">
        <h1> {this.state.mode !== 'update' ? 'Add' : 'Edit'} Contact</h1>
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
          error={!this.state.email}
          className={classes.formControl}
        >
          <InputLabel htmlFor="email-error">Email</InputLabel>
          <Input
            id="email-error"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          />
          {!this.state.email ? (
            <FormHelperText id="email-error-text">Enter email</FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        {this.state.mode === "update"?
          <p className={classes.formControl}>
            Current Group: <b>{this.state.groupName}</b>
          </p>
        : ''}
        <Group
          value={this.state.groupId}
          group={this.handleGroupChange}
          onChange={this.handleChange}
          name="group"
        />

        <FormControl
          aria-describedby="select state"
          error={this.state.validEmail}
          className={classes.formControl}
        >
          <label className="MuiFormLabel-root-146">Employee State</label>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.employeeState}
                onChange={this.handleContactStatusToggle('employeeState')}
                value={this.state.employeeState}
                name="employeeState"
                color="primary"
              />
            }
            label="Active/inActive"
          />
        </FormControl>

        <span>
          {this.state.mode !== 'update' ? (
            <span>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.addContactSubmit}
              >
                Add contact
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.reset}
              >
                Reset
              </Button>
            </span>
          ) : (
            <span>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.updateContactSubmit}
              >
                Update contact
              </Button>
            </span>
          )}
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(Contact);
