import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/SearchForm.css";
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: this.props.query || "",
      validated: false,
      valid: null,
      error: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      ...this.state,
      searchInputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const regex = /^[^\/%]+$/;
    const isValid = event.target.search.value !== "" && regex.test(event.target.search.value);

    if (event.target.search.value === "") {
      this.setState({
        ...this.state,
        validated: true,
        valid: false,
        error: "No search input, please provide a search term.",
      });
    } else if (!isValid) {
      this.setState({
        ...this.state,
        validated: true,
        valid: false,
        error: "Search input cannot contain '/' or '%'",
      });
    } else {
      this.setState({
        ...this.state,
        validated: true,
        valid: true,
        error: "",
      });
    }

    if (!isValid) {
      this.props.onReset();
    } else {
      this.props.onSubmit(this.state.searchInputValue);
    }
  };

  handleReset = (event) => {
    event.preventDefault();
    this.props.onReset();
    this.setState({
      ...this.state,
      searchInputValue: "",
      validated: false,
      valid: null,
    });
  };

  render() {
    return (
      <div className="search">
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
          className="search-form"
        >
            <Form.Group
              controlId="search"
              className="search-form-group"
            >
              <Form.Control
                type="text"
                placeholder="Search"
                className="search-form-control"
                isInvalid={!this.state.valid}
                value={this.state.searchInputValue}
                onChange={this.handleInput}
                autoFocus
              />
          </Form.Group>

            <Button
              className="search-button"
              variant="success"
              type="submit"
            >Submit</Button>
            <Button
              className='reset-button'
              variant="secondary"
              type="button"
              onClick={this.handleReset}
            >Clear</Button>

        </Form>
        {this.state.validated && !this.state.valid && (
          <Form.Control.Feedback type="invalid" className="search-form-invalid">
            Validation error: {this.state.error}
          </Form.Control.Feedback>
        )}
      </div>
    );
  };
}

export default SearchForm;
