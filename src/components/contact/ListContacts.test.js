import React from 'react';
import ReactDOM from 'react-dom';
import Input from './ListContacts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListContacts />, div);
  ReactDOM.unmountComponentAtNode(ListContacts);
});
