import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";

import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Browse from "./component/auth/Browse";
import MyProfile from "./component/auth/MyProfile";
import About from "./component/auth/About";

import PlaceholderProfile from "./component/auth/PlaceholderProfile";

import { store } from "./store";
import { loadUser } from "./actions/authActions";

import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <div className="App ">
          <Navbar />

          <div className="body-size">
            <Route exact path="/" component={Landing} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/profile/*" component={PlaceholderProfile} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
          </div>
          <Footer id="footer" />
        </div>
      </Router>
    );
  }
}

export default App;
