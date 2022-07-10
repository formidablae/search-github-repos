import React, { Component } from 'react';
import Card from './Card';
import ResultsPagination from './ResultsPagination';
import "../styles/Results.css";

class Results extends Component {
  render() {
    if (this.props.error) {
      return (
        <div className="results-error">
          <h4 className="results-error-message">Error: {this.props.errorMessage}</h4>
          <h5 className="results-error-documentation-url">
              More info about the error can be found in <a href={this.props.errorDocumentationUrl}>{this.props.errorDocumentationUrl}</a>.
          </h5>

          <ResultsPagination
            pageNum={this.props.pageNum}
            totalResults="1"
            resultsPerPage={this.props.resultsPerPage}
            onPageNumChange={this.props.onPageNumChange}
            query={this.props.query}
          />
        </div>
      );
    } else if (this.props.results) {
      return (
        <div className = "results-container" id = "results">
          {
            this.props.results.length === 0 &&
              this.props.query.length > 0 ? (
              <div className="no-results-found">No results found...</div>
            ) : (
              <div className="results">
                <h4 className="found-results">Found {this.props.totalResults} results</h4>
                {
                  this.props.results.map(result => (
                    <Card
                      key={result.id}
                      name={result.name}
                      username={result.owner.login}
                      description={result.description}
                      url_avatar={result.owner.avatar_url}
                      url_repo={result.html_url}
                      forks={result.forks_count}
                      watchers={result.watchers_count}
                      stars={result.stargazers_count}
                    />
                  ))
                }

                <ResultsPagination
                  pageNum={this.props.pageNum}
                  totalResults={this.props.totalResults}
                  resultsPerPage={this.props.resultsPerPage}
                  onPageNumChange={this.props.onPageNumChange}
                  query={this.props.query}
                />
              </div>
            )
          }
        </div>
      );
    } else return <div className="perform-search-message">Perform a search</div>;
  }
}

export default Results;
