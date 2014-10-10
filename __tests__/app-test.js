/** @jsx React.DOM */

var appPath = '../src/app.js';

jest.dontMock( appPath );

describe( 'App', function() {
  it( 'renders a header', function() {
    var React = require( 'react/addons' ),
      App = require( appPath ),
      TestUtils = React.addons.TestUtils,

      app = TestUtils.renderIntoDocument( <App /> );

    TestUtils.findRenderedDOMComponentWithTag( app, 'h1' );
  });
});
