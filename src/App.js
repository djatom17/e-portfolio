import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";

import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Browse from "./component/auth/Browse";
import Profile from "./component/auth/Profile";
import MyProfile from "./component/auth/MyProfile";
import About from "./component/auth/About";

import Profile2 from "./component/auth/Profile2";
import Profile3 from "./component/auth/Profile3";
import Profile4 from "./component/auth/Profile4";
import Profile5 from "./component/auth/Profile5";

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
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className={"container"}>
                    <Route exact path="/browse" component={Browse} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/my-profile" component={MyProfile} />
                    <Route exact path="/profile2" component={Profile2} />
                    <Route exact path="/profile3" component={Profile3} />
                    <Route exact path="/profile4" component={Profile4} />
                    <Route exact path="/profile5" component={Profile5} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />

                </div>
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
