import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PlaceholderProfile from "./PlaceholderProfile";
import * as ProfileData from "../../api/ProfileData";
import Settings from "../profileDisplays/Settings";
import { Redirect } from "react-router-dom";

class MyProfile extends Component {
  state = {
    profile: {},
    profileLoading: true,
    profileLoaded: false,
    layout: "",
    pid: "",
    primaryColour: "",
    secondaryColour: "",
  };

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

  // componentDidUpdate() {
  //   if (
  //     this.props.location.state &&
  //     this.props.location.state.showSettings &&
  //     this.state.showSettingsOnLoad !== this.props.location.state.showSettings
  //   ) {
  //     console.log("in here");
  //     this.setState({
  //       showSettingsOnLoad: this.props.location.state.showSettings,
  //     });
  //   }
  // }

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
        component = (
          <div>
            <PlaceholderProfile
              profile={this.state.profile}
              primaryColour={this.state.primaryColour}
              secondaryColour={this.state.secondaryColour}
            />
            <Settings
              layout={this.state.profile.layout}
              linkToProfile={this.state.profile.linkToProfile}
              firstName={this.state.profile.firstName}
              lastName={this.state.profile.lastName}
              visible={this.props.settingsOnLoad}
              pid={this.state.profile._id}
              primaryColour={this.state.profile.primaryColour}
              secondaryColour={this.state.profile.secondaryColour}
            />
          </div>
        );
      }
    }

    return <div>{component}</div>;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  settingsOnLoad: state.profile.showSettings,
});

export default connect(mapStateToProps, {})(MyProfile);
