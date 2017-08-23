import React from 'react';
import ReactDOM from 'react-dom';
import App from './ComicStore';
import { BrowserRouter, Link } from 'react-router-dom';

const Mocha = require('mocha');
const expect = require('chai').expect;

describe('main block'), function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(App, div);
  });
}
