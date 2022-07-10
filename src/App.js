import React, { Component } from 'react'
import "./styles/App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Home from './pages/Home';
import PageNotFound from './pages/errors/PageNotFound';

class App extends Component {

  render() {
    const logoPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/480px-Octicons-mark-github.svg.png";

    return (
      <BrowserRouter>
        <div className="layout">
          <NavBar>
            <img className="logo" src={logoPath} alt="" width={"auto"} height={"100%"} />
            <h1 className="title">Search GitHub Repos</h1>
          </NavBar>
          <Container>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route path="*" component={Home} />
              <PageNotFound />
            </Switch>
          </Container>
          <footer className="footer">
            GitHub Repos Seach
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
