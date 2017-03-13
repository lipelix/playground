import React, { Component } from 'react';
import PlaceAutosuggest from './components/PlaceAutosuggest/PlaceAutosuggest';
import Map from './components/GMap/Map';
import Route from './components/Route/Route'
import sampleData from './data.js';
import './App.css';

class AppController extends Component {

	constructor(props) {
		super(props);

		this.state = {
			from: '',
			to: '',
			routes: null
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

	changeRoutes = (routes) => {
		console.log('Map routes changed', routes);
		this.setState({
			routes: routes
		});
	}

	findRoute = () => {
		console.log('Find route: ' + this.state.from.structured_formatting.main_text + ' -> ' + this.state.to.structured_formatting.main_text);
	}

	render() {

		return (
			<div className="app">
				<PlaceAutosuggest placeholder='Start' onPlaceSelected={this.onStartSelect} />
				<PlaceAutosuggest placeholder='Destination' onPlaceSelected={this.onDestinationSelect} />
				{
					this.state.routes && <Route route={this.state.routes[0]} />
				}
				<Button text='Find' onClick={this.findRoute} />
				<Map from={this.state.from} to={this.state.to} onRoutesChanged={this.changeRoutes} />
			</div>
			);
	}
};

const Button = ({ text, onClick }) => (
	<input type='button' className='btn' onClick={onClick} value={text} />
);

export default AppController;
