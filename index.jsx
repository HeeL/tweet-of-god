import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App';

const props = { window, fetch };

ReactDOM.render(<App {...props} />, window.document.getElementById('app'));
