import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mocha } from 'mocha';
import { expect } from 'chai';
import { renderComic } from './../views/IssueView';

describe('main block', () => {
  it('renders without crashing', () => {
    TestUtils.scryRenderedDOMComponentsWithClass(<div>test</div>);
  });
});
