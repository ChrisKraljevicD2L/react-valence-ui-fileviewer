'use strict';

var React = require('react');

var NativeViewer = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		document.body.style.overflow = 'hidden';
		this.updateProgress(100);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
		document.body.style.overflow = 'visible';
	},
	getInitialState: function() {
		return { height: null };
	},
	handleResize: function() {
		var rect = React.findDOMNode(this.refs.wrapper).getBoundingClientRect();
		var height = (window.innerHeight - rect.top);
		this.setState({height: height});
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	render: function() {
		var style = this.state.height ? { height: this.state.height } : null;
		return <iframe
			src={this.props.src}
			className="vui-fileviewer-html-native"
			ref="wrapper"
			style={style}>
		</iframe>;
	}
});

module.exports = NativeViewer;
