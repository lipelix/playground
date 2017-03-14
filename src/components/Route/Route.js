import React, { Component } from 'react';
import Leg from './Leg'

class Route extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.route);
		let legItems = [];

		if (this.props.route) {
			legItems = this.props.route.legs.map((leg) =>
				<Leg 
					key={leg.start_address} 
					start={leg.start_address} 
					end={leg.end_address}
					departureTime={leg.departure_time}
					arrivalTime={leg.arrival_time}
					distance={leg.distance}
					duration={leg.duration}
				/>
			);
		}

		return (
			<div className='route'>
				{legItems}
			</div>
		);
	}
};

export default Route;
