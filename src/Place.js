import React, { Component } from 'react';

class FindPlaceInput extends Component {
	constructor() {
		super();
		this.state = {
			value: 'blablaasd'
		};
	}

	onTextChange() {
		console.log('text changed');
	}

	render(onFind) {
		return (
		<div className="place">
			<input type="text" defaultValue={this.state.value} onChange={this.onTextChange} />
		</div>
		);
	}

};

export default FindPlaceInput;