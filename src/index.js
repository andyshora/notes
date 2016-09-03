// Core
import React from 'react';
import ReactDOM from 'react-dom';
import config from 'config';

import App from './app';
import log from 'loglevel';

ReactDOM.render(
  <App />,
  document.getElementById('app-container')
);
