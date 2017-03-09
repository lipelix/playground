import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';

const coords = {
	lat: 51.5258541,
	lng: -0.08040660000006028
};

const params = {
	v: '3.exp',
	key: 'AIzaSyDcHGUulEKHrbDJEgrngPNjMbDRSQwZBQA',
	origin: 'place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE',
	destination: 'place_id:ChIJtxE9E-XxCkcRgwvBP25AuTE'
};

class Map extends Component {

	constructor(props) {
		super(props);

		this.state = {
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

		this.directionsDisplay = new window.google.maps.DirectionsRenderer();
		this.directionsService = new window.google.maps.DirectionsService();

		this.directionsDisplay.setMap(map);
		this.setRoute();
	}

	onDragEnd(e) {
		console.log('onDragEnd', e);
	}

	onCloseClick() {
		console.log('onCloseClick');
	}

	onClick(e) {
		console.log('onClick', e);
	}

	setRoute() {
		this.directionsService.route({
			origin: params.origin,
			destination: params.destination,
			travelMode: 'DRIVING'
		}, function (response, status) {
			debugger;
			if (status === 'OK') {
				this.directionsDisplay.setDirections(response);
			}
			else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	render() {
		return (
			<Gmaps
				width={'800px'}
				height={'600px'}
				lat={coords.lat}
				lng={coords.lng}
				zoom={12}
				loadingMessage={'Be happy'}
				params={params}
				onMapCreated={this.onMapCreated}>
				<Marker
					lat={coords.lat}
					lng={coords.lng}
					draggable={true}
					onDragEnd={this.onDragEnd} />
				<InfoWindow
					lat={coords.lat}
					lng={coords.lng}
					content={'Hello, React :)'}
					onCloseClick={this.onCloseClick} />
				<Circle
					lat={coords.lat}
					lng={coords.lng}
					radius={500}
					onClick={this.onClick} />
			</Gmaps>
			);
	}

};

export default Map;