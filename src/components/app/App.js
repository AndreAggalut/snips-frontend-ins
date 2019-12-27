import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from '../../utils/axios';
import Header from '../header/Header';
import Pages from '../pages/index';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.setToken();
  }
  submitSignup = async signupData => {
    console.log('Hello from Signup');
    const res = await axios.post(`/signup`, signupData);
    console.log(res);
  };
  submitLogin = async loginData => {
    console.log('Hello from Login', loginData);
    const res = await axios.post(`/login`, loginData);
    localStorage.setItem('app-token', res.data.token);
    this.setToken(res.data.token);
  };

  setToken = (token = null) => {
    let tempToken = token;
    if (tempToken !== null) {
      tempToken = localStorage.getItem('app-token');
      if (tempToken !== null) {
        axios.defaults.headers.common.Authorization = `Bearer ${tempToken}`;
      }
    }
  };

  render() {
    const { HomePage, SnippetsPage, AccountPage, FourOhFourPage } = Pages;
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/snippets">
            <SnippetsPage />
          </Route>
          <Route path="/account">
            <AccountPage
              onLogin={this.submitLogin}
              onSignup={this.submitSignup}
            />
          </Route>
          <Route>
            <FourOhFourPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
