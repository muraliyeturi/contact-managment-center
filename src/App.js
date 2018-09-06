import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { mainMenu, employeeMenu, groupMenu } from './menuItems';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Login from './components/Login.js';
import Contact from './components/contact/Contact.js';
import ListContacts from './components/contact/ListContacts.js';
import AddGroup from './components/group/AddGroup.js';
import ListGroups from './components/group/ListGroups.js';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight - 10,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {

  constructor() {
    super();
    this.isLoggedInStatus = this.isLoggedInStatus.bind(this);
    this.state = {
      open: false,
      isLoggedIn: window.localStorage.getItem("currentUser") !== null
    };
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  isLoggedInStatus = (status) => {
    if(status) {
      this.setState({isLoggedIn: true});
      NotificationManager.success('user successfully logged in', 'Welcome..!');
    }
  };

  handleLogout = () => {
    NotificationManager.success('user successfully logged out', '!');
    this.setState({isLoggedIn:false});
    window.localStorage.removeItem("currentUser");
  }

  render() {
    const { classes, theme } = this.props;
    let appContext = <Login sendData={this.isLoggedInStatus}/>;

    if (this.state.isLoggedIn) {
      appContext = <Router>
      <div className={classes.root} >
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              INMAR Group directory
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }} open={this.state.open}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <List>{mainMenu}</List>
          <Divider />
          <List>{employeeMenu}</List>
          <Divider />
          <List>{groupMenu}</List>
          <Divider />
          <ListItem button onClick={this.handleLogout}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
              <ListItemText primary="Logout" />
          </ListItem>
        </Drawer>
        <main className={classes.content}>
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/contact/:contactId' component={Contact} />
          <Route exact path='/listcontacts' component={ListContacts} />
          <Route exact path='/group' component={AddGroup} />
          <Route exact path='/group/:groupId' component={AddGroup} />
          <Route exact path='/listgroups' component={ListGroups} />
        </main>
        <NotificationContainer/>

      </div>
      </Router>
    };

    return (
      appContext
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
