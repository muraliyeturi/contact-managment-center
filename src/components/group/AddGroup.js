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
import axios from 'axios';

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

const emailDomain = 'inmar.com';

class AddGroup extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      groupState: true,
      groupName: '',
      message: '',
      mode: 'add'
    };
  }

  submitHandler = () => {
    this.props.sendData(this.state.username);
  };

  addGroupSubmit = () => {
    const _this = this;
    let headers = {
      'Content-Type': 'application/json',
      token: window.localStorage.getItem('currentUser')
    };
    axios
      .post(
        api.url + api.group,
        {
          name: this.state.groupName,
          activeStatus: this.state.groupActiveStatus
        },
        { headers: headers }
      )
      .then(function(response) {
        _this.setState({
          message: response.data.message || response.data.errmsg
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  updateGroupSubmit = () => {
    const _this = this;
    let headers = {
      'Content-Type': 'application/json',
      token: window.localStorage.getItem('currentUser')
    };
    axios
      .put(
        api.url + api.group + '/' + _this.state.groupId,
        {
          name: this.state.groupName,
          activeStatus: this.state.groupState
        },
        { headers: headers }
      )
      .then(function(response) {
        _this.setState({
          message: response.data.message || response.data.errmsg
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    let _this = this;
    let groupId = this.props.match.params.groupId;
    if (groupId != null) {
      let headers = {
        'Content-Type': 'application/json',
        token: window.localStorage.getItem('currentUser')
      };
      axios
        .get(api.url + api.group + '/' + groupId, { headers: headers })
        .then(function(response) {
          _this.setState({
            groupName: response.data.name,
            groupState: response.data.activeStatus,
            groupId: groupId,
            mode: 'update'
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleGroupStatusChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div class="topPadding">
        <h1>{this.state.mode === 'add' ? 'Create' : 'Edit'} Group</h1>
        <p>{this.state.message}</p>
        <FormControl
          aria-describedby="enter first name"
          error={!this.state.groupName}
          className={classes.formControl}
        >
          <InputLabel htmlFor="groupname-error">Group Name</InputLabel>
          <Input
            id="groupname-error"
            value={this.state.groupName}
            onChange={this.handleChange}
            name="groupName"
          />
          {!this.state.groupName ? (
            <FormHelperText id="groupname-error-text">
              Enter Group name
            </FormHelperText>
          ) : (
            ''
          )}
        </FormControl>

        <FormControl
          aria-describedby="select state"
          error={this.state.validEmail}
          className={classes.formControl}
        >
          <label className="MuiFormLabel-root-146">Group State</label>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.groupState}
                onChange={this.handleGroupStatusChange('groupState')}
                value={this.state.groupState}
                name="groupActiveStatus"
                color="primary"
              />
            }
            label="Active/inActive"
          />
        </FormControl>

        <span>
          {this.state.mode === 'add' ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={this.addGroupSubmit}
            >
              Create Group
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={this.updateGroupSubmit}
            >
              update Group
            </Button>
          )}
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(AddGroup);
