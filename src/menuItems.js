import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Home from '@material-ui/icons/Home';
import GroupSharp from '@material-ui/icons/GroupSharp';
import GroupAdd from '@material-ui/icons/GroupAdd';

import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Book from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';

export const mainMenu = (
  <div>
    <a href="/">
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </a>
  </div>
);

export const employeeMenu = (
  <div>
    <a href="/contact">
      <ListItem button>
        <ListItemIcon>
          <GroupAdd />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
    </a>
    <a href="/listcontacts">
      <ListItem button>
        <ListItemIcon>
          <GroupSharp />
        </ListItemIcon>
        <ListItemText primary="Search contacts" />
      </ListItem>
    </a>
  </div>
);

export const groupMenu = (
  <div>
    <a href="/group">
      <ListItem button>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Add Group" />
      </ListItem>
    </a>
    <a href="/listgroups">
      <ListItem button>
        <ListItemIcon>
          <Book />
        </ListItemIcon>
        <ListItemText primary="Search Group" />
      </ListItem>
    </a>
  </div>
);
