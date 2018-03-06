import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App';

// eslint-disable-next-line no-undef
const props = { window, fetch };

// eslint-disable-next-line no-undef
ReactDOM.render(<App {...props} />, document.getElementById('app'));
