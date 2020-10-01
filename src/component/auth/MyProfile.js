import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PlaceholderProfile from "./PlaceholderProfile";
import { Redirect } from "react-router-dom";

class MyProfile extends Component {
  state = { profile: {}, profileLoading: true, profileLoaded: false };

  componentDidMount() {
    // GET user profile
    axios
      .get("/api/my-profile", {
        headers: {
          "x-auth-token": this.props.token,
        },
      })
      //Returns profile fetched via GET into render
      .then((res) => {
        this.setState({
          profile: res.data,
          profileLoading: false,
          profileLoaded: true,
        });
      })
      .catch((err) => {
        console.log("Unable to fetch your profile. Redirecting... ", err);
        this.setState({ profileLoading: false, profileLoaded: false });
      });
  }

  render() {
    let component;
    if (
      !this.props.isAuthenticated ||
      (!this.state.profileLoading && !this.state.profileLoaded)
    ) {
      component = <Redirect to="/login" />;
    } else if (this.state.profileLoading || !this.state.profile) {
      component = null;
    } else {
      if (this.state.profile) {
        console.log("here else ", this.state.profile);
        component = <PlaceholderProfile profile={this.state.profile} />;
      }
    }

    return <div>{component}</div>;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(MyProfile);
