import React from 'react';
import ReactDOM from 'react-dom';
import Input from './AddGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddGroup />, div);
  ReactDOM.unmountComponentAtNode(AddGroup);
});
