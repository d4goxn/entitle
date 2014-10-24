/** @jsx React.DOM */

var src = '../src/title-list.js';

jest.dontMock( src );

describe( 'TitleList', function() {
  it( 'renders a list of titles', function() {
    var titleData = ['A Title', 'Another Title'];

    var React = require( 'react/addons' );
    var TitleList = require( src );
    var TestUtils = React.addons.TestUtils;

    var titleList = TestUtils.renderIntoDocument(
      <TitleList titles={titleData} />
    );

    var titleLists = TestUtils.scryRenderedComponentsWithType( titleList, TitleList );
    var ul = TestUtils.findRenderedDOMComponentWithTag( titleList, 'ul' );
    var childNodes = ul.getDOMNode().childNodes;

    expect( ul.getDOMNode().childNodes.length ).toEqual( titleData.length );

    for(var i = 0; i < childNodes.length; i++) {
      expect( childNodes[i].tagName.toLowerCase() ).toEqual( 'li' );
    };
  });
});
