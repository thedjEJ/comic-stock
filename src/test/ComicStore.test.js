'use strict';
//  Mocha TEST
// file: __tests__/components/QuestionComponent.spec.js
import ReactDOM from 'react-dom';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import { QuestionsComponent } from '../components/Issue.jsx';
import sinon from 'sinon';
var dispatch = function() {
   console.log('>>>>>>>> Mocking dispatch ');
 };
var props = {
   dispatch: dispatch,
   routeParams: {test_id: 1},
   tests_rdcr: {}
  };
describe('Issue', function () {
it('Issue calls componentWillMount', () => {
     sinon.spy(Issue.prototype, 'componentWillMount');
     const enzymeWrapper = mount(<Issue {...props} />);
     expect(Issue.prototype.componentWillMount.calledOnce).to.equal(true);
   });