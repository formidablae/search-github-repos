import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import "../styles/ResultsPagination.css";

class ResultsPagination extends Component {
    render() {
        const lastPage = Math.ceil(this.props.totalResults / this.props.resultsPerPage);
        console.log("lastPage", lastPage);
        return (
            <Pagination className="result-pages-nav">
                {this.props.pageNum > 1 && (
                    <Pagination.First onClick={() => this.props.onPageNumChange(this.props.query, 1)} />
                )}
                {this.props.pageNum > 1 && (
                    // eslint-disable-next-line
                    <Pagination.Prev onClick={() => this.props.onPageNumChange(this.props.query, parseInt(this.props.pageNum) - 1)} />
                )}
                <Pagination.Item>{this.props.pageNum}</Pagination.Item>
                {this.props.pageNum < lastPage && (
                    // eslint-disable-next-line
                    <Pagination.Next onClick={() => this.props.onPageNumChange(this.props.query, parseInt(this.props.pageNum) + 1)} />
                )}
                {this.props.pageNum < lastPage && (
                    <Pagination.Last onClick={() => this.props.onPageNumChange(this.props.query, lastPage)} />
                )}
            </Pagination>
        );
    }
}

export default ResultsPagination;
