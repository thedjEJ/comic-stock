var assert = require('assert');
// Mocking window and document object:
require('./dom-mock')('<html><body></body></html>');
//require('./../components/Supplier');

describe('Empty test', function() {

  it('empty test should run successfully', function() {

    assert.equal('A', 'A');
  });
});