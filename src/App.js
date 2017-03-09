import React, { Component } from 'react';
import PlaceAutosuggest from './components/PlaceAutosuggest/PlaceAutosuggest';
import Map from './components/GMap/Map';
import sampleData from './data.js';
import './App.css';

class AppController extends Component {

	constructor(props) {
		super(props);

		this.state = {
			from: '',
			to: '',
			loading: false,
			error: false
		};
	}

	onStartSelect = (e, cfg) => {
		this.setState({
			from: cfg.suggestion
		});
	}

	onDestinationSelect = (e, cfg) => {
		this.setState({
			to: cfg.suggestion
		});
	}

	startLoad() {
		this.setState({
			loading: true
		});
	}

	dataLoaded(data) {
		this.setState({
			loading: false,
			error: false,
			data
		});
	}

	loadError(error) {
		this.setState({
			loading: false,
			error: error.message,
			data: sampleData.predictions
		});
	}

	findRoute() {
		console.log('Find route: ', this.state.from.structured_formatting.main_text, ' -> ', this.state.to.structured_formatting.main_text);
	}

	render() {

		return (
			<div className="app">
				<PlaceAutosuggest placeholder='Start' onPlaceSelected={this.onStartSelect} />
				<PlaceAutosuggest placeholder='Destination' onPlaceSelected={this.onDestinationSelect} />
				<RouteInfo
					from={this.state.from.structured_formatting ? this.state.from.structured_formatting.main_text : ''}
					to={this.state.to.structured_formatting ? this.state.to.structured_formatting.main_text : ''} />
				<Button text='Find' onClick={this.findRoute.bind(this)} />
				<Map />
			</div>
			);
	}
};

const Button = ({ text, onClick }) => (
	<input type='button' className='btn' onClick={onClick} value={text} />
);

const RouteInfo = ({ from, to }) => (
	<div>
		<h2>Route</h2>
		<span>{ from } &rarr; { to }</span>
	</div>
);

export default AppController;
