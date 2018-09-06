import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(Login);
});
