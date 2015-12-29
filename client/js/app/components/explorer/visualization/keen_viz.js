/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');

var ExplorerUtils = require('../../../utils/ExplorerUtils');

var KeenViz = React.createClass({

	// ***********************
	// Convenience functions
	// ***********************

	showVisualization: function() {
		this.props.dataviz.destroy(); // Remove the old one first.
  	this.props.dataviz.data(this.props.model.response)
			.el(this.refs['keen-viz'].getDOMNode())
			.height(400)
	    .type(this.props.model.metadata.visualization.chart_type);
		if (this.props.model.metadata.visualization.chart_type !== 'metric') {
			this.props.dataviz
				.title(null)
				.chartOptions({
					transition: { duration: 0 }
				});
		}
		this.props.dataviz.render();
	},

	// ***********************
	// Lifecycle hooks
	// ***********************

	componentDidUpdate: function() {
		this.showVisualization();
	},

	componentDidMount: function() {
		this.showVisualization();
  },

  render: function() {
    return (
			<div ref="keen-viz"></div>
    );
  }
});

module.exports = KeenViz;
