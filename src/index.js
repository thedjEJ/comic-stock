import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ComicStore from './ComicStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ComicStore />, document.getElementById('root'));
registerServiceWorker();
