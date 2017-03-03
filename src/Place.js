import React, { Component } from 'react';

class Place extends Component {

	getInitialState() {
		return {
			icon: '',
			name: '-'
		};
	}

	render() {
		return (
		<div className="place">
			<span className="placeName">{this.state.name}</span>
			<img src={this.state.icon} alt="place icon" />
		</div>
		);
	}

};

export default Place;