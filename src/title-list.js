/** @jsx React.DOM */

'use strict';

var React = require('react');

var TitleList = module.exports = React.createClass({
  render: function() {

    var titles = this.props.titles.map(function(title) {
      return (
        <li><strong>{title.text}</strong></li>
      );
    });

    return (
      <ul>
        {titles}
      </ul>
    );
  }
});
