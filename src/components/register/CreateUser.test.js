import React from 'react';
import ReactDOM from 'react-dom';
import Input from './CreatUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatUser />, div);
  ReactDOM.unmountComponentAtNode(CreatUser);
});
