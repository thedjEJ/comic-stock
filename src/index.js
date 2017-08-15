import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ComicStore from './ComicStore';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<ComicStore />, document.getElementById('root'));
registerServiceWorker();
