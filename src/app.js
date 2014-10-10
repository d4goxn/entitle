/** @jsx React.DOM */

'use strict';

var React = require('react');

var App = React.createClass({
	render: function() {
		return <h1>Ahoyhoy!</h1>;
	}
});

React.renderComponent(<App />, document.body);
