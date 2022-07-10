import React, { Component } from 'react';
import SearchForm from '../components/SearchForm.js';
import Results from '../components/Results.js';
import api from '../services/api';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            query: this.getQueryParam('query') || '',
            results: null,
            totalResults: null,
            pageNum: this.getQueryParam('page') || null,
            resultsPerPage: 10,
            error: false,
            errorMessage: '',
            errorDocumentationUrl: ''
        };
    }

    getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    componentDidMount() {
        if (this.getQueryParam('query') !== null && this.getQueryParam('page') !== null) {
            this.getData(this.getQueryParam('query'), this.getQueryParam('page'));
        }
    }

    getData = async (query, pageNum=1) => {
        try {
            const response = await api.get(
                `repositories?q=${query}&page=${pageNum}&per_page=${this.state.resultsPerPage}`
            );
            this.setState({
                ...this.state,
                query: query,
                results: response.data.items,
                totalResults: response.data.total_count,
                pageNum: pageNum,
                error: false,
                errorMessage: "",
                errorDocumentationUrl: ""
            });
            this.props.history.push(`search?query=${this.state.query}&page=${this.state.pageNum}`);
        } catch (error) {
            this.setState({
                ...this.state,
                query: query,
                results: null,
                pageNum: pageNum,
                error: true,
                errorMessage: error.response.data.message,
                errorDocumentationUrl: error.response.data.documentation_url
            });
            this.props.history.push(`search?query=${this.state.query}&page=${this.state.pageNum}`);
        }
    };

    handleReset = () => {
        this.setState({
            ...this.state,
            query: "",
            results: null,
            totalResults: null,
            pageNum: null,
            error: false,
            errorMessage: '',
            errorDocumentationUrl: ''
        });
        this.props.history.push("");
    }

    render() {
        return (
            <div>
                <SearchForm
                    query={this.state.query}
                    onSubmit={this.getData}
                    onReset={this.handleReset}
                />
                <Results
                    query={this.state.query}
                    results={this.state.results}
                    totalResults={this.state.totalResults}
                    pageNum={this.state.pageNum}
                    resultsPerPage={this.state.resultsPerPage}
                    onPageNumChange={this.getData}
                    error={this.state.error}
                    errorMessage={this.state.errorMessage}
                    errorDocumentationUrl={this.state.errorDocumentationUrl}
                />
            </div>
        )
    }
};

export default Home;
