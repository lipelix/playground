import React, { Component } from 'react';
import request from 'superagent';
import logo from './logo.svg';
import sampleData from './data.js';
import './App.css';

const apiUrl = (apiKey) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?
	location=49.75,13.366667&
	radius=1500&
	name=cruise&
	key=${apiKey}`;

class AppController extends Component {
    state = {}

    onLoad = () => {
        this.startLoad();

        request.get(apiUrl('AIzaSyAswJC_4jBtW0rm_cVP1lb6Nbd5ePnCZIw'))
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
            data: sampleData.results
        });
    }

    render() {
        const { loading, error, data } = this.state;

        return (
            <AppComponent
                loading={loading}
                error={error}
                data={sampleData}
                onLoad={this.onLoad}
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
	<img src={place.icon} />
        <div>Name: {place.name}</div>
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

const AppComponent = ({ loading, error, data, onLoad }) => (
    <div className="App">
        <button onClick={onLoad} disabled={loading}>Load</button>
        <ErrorMessage error={error} />
        <LoadingIndicator loading={loading} />
        { data && <PlaceList places={data.results} /> }
    </div>
);


export default AppController;
