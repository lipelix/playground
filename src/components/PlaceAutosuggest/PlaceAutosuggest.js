import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import request from 'superagent';
import './PlaceAutosuggest.css'

/* ---------- */
/*    Data    */
/* ---------- */

const apiUrl = (placeName, apiKey) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?
	input=${placeName}&
	types=geocode&
	language=cs_CZ&
	key=${apiKey}`;


/* --------------- */
/*    Component    */
/* --------------- */

class PlaceAutosuggest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: [],
			selectedPlace: null,
			isLoading: false,
			error: null
		};

	}

	loadSuggestions(value) {
		this.setState({
			isLoading: true
		});

		request.get(apiUrl(value, 'AIzaSyDcHGUulEKHrbDJEgrngPNjMbDRSQwZBQA'))
			.set('Accept', 'application/json')
			.then(res => this.dataLoaded(res.body))
			.catch(error => this.loadError(error));

	}

	dataLoaded(data) {
		this.setState({
			isLoading: false,
			error: false,
			suggestions: data.predictions
		});
	}

	loadError(error) {
		this.setState({
			isLoading: false,
			error: error.message,
			suggestions: []
		});
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	onPlaceSelected = (event, { suggestion }) => {
		this.setState({
			selectedPlace: suggestion
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.loadSuggestions(value);
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	getSuggestionValue = (suggestion) => {
		return suggestion.structured_formatting.main_text;
	}

	renderSuggestion = (suggestion) => {
		return (
			<div>
				<span className='title'>{suggestion.structured_formatting.main_text}</span>
				<span className='subtitle'>{suggestion.structured_formatting.secondary_text}</span>
			</div>
		);
	}

	render() {
		const {value, suggestions, isLoading, error} = this.state;

		const inputProps = {
			placeholder: 'Type to find place',
			value,
			onChange: this.onChange
		};

		const theme = {
			container: 'container',
			containerOpen: 'container-open',
			input: 'input',
			inputOpen: 'input-open',
			inputFocused: 'input-focused',
			suggestionsContainer: 'suggestions-container',
			suggestionsContainerOpen: 'suggestions-container-open',
			suggestionsList: 'suggestions-list',
			suggestion: 'suggestion',
			suggestionFirst: 'suggestion-first',
			suggestionHighlighted: 'suggestion-highlighted',
			sectionContainer: 'section-container',
			sectionContainerFirst: 'section-container-first',
			sectionTitle: 'section-title'
		};

		return (
			<div className='placeAutosuggest'>
				{isLoading && <div className='loader'></div>}
				{error && <div className='error'>{error}</div>}
				<Autosuggest
					theme={theme}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					onSuggestionSelected={this.props.onPlaceSelected}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={this.renderSuggestion}
					inputProps={inputProps} />
			</div>
		);
	}
}

export default PlaceAutosuggest;
