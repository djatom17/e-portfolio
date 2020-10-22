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
import Settings from "./component/profileDisplays/Settings";
import PlaceholderProfile from "./component/auth/PlaceholderProfile";

import * as ProfileData from "./api/ProfileData";

import { store } from "./store";
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
  state = {
    settingsLoading: false,
    settingsVisible: false,
    userLayout: "",
    pid: "",
  };

  constructor() {
    super();

    this.showSettings = ProfileData.showSettings.bind(this);
    this.settingsOk = ProfileData.settingsOk.bind(this);
    this.settingsCancel = ProfileData.settingsCancel.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <div className="App ">
          <Navbar showSettings={this.showSettings} />

          <div className="body-size">
            <Route exact path="/" component={Landing} />
            <Route exact path="/browse" component={Browse} />
            <Route
              exact
              path="/profile/*"
              component={PlaceholderProfile}
              layout={this.state.userLayout}
              pid={this.state.pid}
            />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />

            {this.props.auth.user ? (
              <Settings
                handleOk={this.settingsOk}
                handleCancel={this.settingsCancel}
                layout={this.state.userLayout}
                visible={this.state.settingsVisible}
                loading={this.state.settingsLoading}
                pid={this.props.auth.user.pid}
              />
            ) : null}
          </div>
          <Footer id="footer" />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(App);
