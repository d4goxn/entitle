/** @jsx React.DOM */

var appPath = '../src/app.js';

jest.dontMock( appPath );

describe( 'App', function() {
  it( 'renders a header', function() {
    var React = require( 'react/addons' );
    var App = require( appPath );
    var TestUtils = React.addons.TestUtils;

    var app = TestUtils.renderIntoDocument( <App /> );

    TestUtils.findRenderedDOMComponentWithTag( app, 'h1' );
  });
});
