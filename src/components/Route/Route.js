import React, { Component } from 'react';

const Leg = ({ text }) => (
	<span>{text}</span>
);

class Route extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: this.props.route
		};
	}

	render() {
		console.log(this.state.data);

		const legItems = this.state.data.legs.map((leg) =>
			<Leg key={leg.start_address} text={leg.start_address} />
		);

		return (
			<div className='route'>
				{legItems}
			</div>
		);
	}
};

export default Route;
