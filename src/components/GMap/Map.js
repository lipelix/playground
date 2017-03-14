import React, { Component } from 'react';
import {Gmaps} from 'react-gmaps';

const params = {
	v: '3.exp',
	key: 'AIzaSyDcHGUulEKHrbDJEgrngPNjMbDRSQwZBQA'
};

class Map extends Component {

	constructor(props) {
		super(props);

		this.state = {
			map: null,
			travelMode: 'TRANSIT',
			from: null,
			to: null
		};

		this.directionsDisplay = null;
		this.directionsService = null;
	}

	onMapCreated(map) {
		map.setOptions({
			disableDefaultUI: true
		});

		this.setState({
			map: map
		});

		this.directionsDisplay = new window.google.maps.DirectionsRenderer();
		this.directionsService = new window.google.maps.DirectionsService();
		this.directionsDisplay.setMap(this.state.map);
		this.showCurrentLocation();
	}

	showCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				this.state.map.setCenter(pos);
			});
		}
	}

	onClick(e) {
		console.log('onClick Map', e);
	}

	setRoute() {
		if (!this.props.from) {
			console.log('No origin!');
			return;
		}

		if (!this.props.to) {
			console.log('No destination!');
			return;
		}

		this.directionsService.route({
			origin: {'placeId': this.props.from.place_id},
			destination: {'placeId': this.props.to.place_id},
			travelMode: this.state.travelMode
		}, (response, status) => {
//debugger;
			if (status === 'OK') {
				this.directionsDisplay.setDirections(response);
				this.props.onRoutesChanged(response.routes);
			}
			else {
				console.log('Directions request failed due to ' + status);
				this.props.onRoutesChanged([]);
			}
		});
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.from !== this.props.from || prevProps.to !== this.props.to) {
			this.setRoute();
		}
	}

	render() {
		return (
			<Gmaps
				width={'100%'}
				height={'600px'}
				zoom={14}
				loadingMessage={'Loading ...'}
				params={params}
				onClick={this.setRoute.bind(this)}
				onMapCreated={this.onMapCreated.bind(this)}>
			</Gmaps>
		);
	}

};

export default Map;