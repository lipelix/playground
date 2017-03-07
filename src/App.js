import React, { Component } from 'react';
import FindPlaceInput from './Place'
import request from 'superagent';
import logo from './logo.svg';
import sampleData from './data.js';
import './App.css';

const apiUrl = (placeName, apiKey) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?
	input=${placeName}&
	types=geocode&
	language=cs_CZ&
	key=${apiKey}`;

class AppController extends Component {
    state = {}

    onLoad = () => {
        this.startLoad();

        request.get(apiUrl('Anglick' ,'AIzaSyAswJC_4jBtW0rm_cVP1lb6Nbd5ePnCZIw'))
		.set('Accept', 'application/json')
		.then(res => this.dataLoaded(res.body))
		.catch(error => this.loadError(error));
    }

    startLoad() {
        this.setState({ loading: true });
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

    onPlaceFindChange(newText) {
	    this.setState({
		findingPlace: true,
		findPlaceName: newText
	    });

	    console.log('find', newText);
    }

    render() {
        const { loading, error, data } = this.state;

        return (
            <AppComponent
                loading={loading}
                error={error}
                data={data}
                onLoad={this.onLoad}
                onChange={this.onFindPlaceChange}
            />
        );
    }
};

const ErrorMessage = ({ error }) => (
    error ? <div className="alert">{ error }</div> : null
);

const LoadingIndicator = ({ loading }) => (
    loading ? <div className="loading">loading...</div> : null
);

const Place = ({ place }) => (
    <div className="place">
        <div className="placeTitle">{place.structured_formatting.main_text}</div>
        <div>{place.structured_formatting.secondary_text}</div>
    </div>
);

const PlaceList = ({ places }) => (
    <div>
        {
            places.map(place => (
                <Place key={place.place_id} place={place} />
            ))
        }
    </div>
);

const AppComponent = ({ loading, error, data, onLoad, onPlaceFindChange }) => (
    <div className="app">
        <button onClick={onLoad} disabled={loading}>Load</button>
	<FindPlaceInput onChange={onPlaceFindChange} />
        <ErrorMessage error={error} />
        <LoadingIndicator loading={loading} />
        { data && <PlaceList places={data.predictions} /> }
    </div>
);


export default AppController;
