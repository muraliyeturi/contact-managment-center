import React from 'react';
import ReactDOM from 'react-dom';
import Input from './ListGroups';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListGroups />, div);
  ReactDOM.unmountComponentAtNode(ListGroups);
});
