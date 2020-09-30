import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PlaceholderProfile from "./PlaceholderProfile";

class MyProfile extends Component {
  state = { profile: {} };

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
        console.log("GOT PROFILE");
        this.setState({ profile: res.data });
      });
  }

  render() {
    let component;
    console.log(this.state.profile);
    if (!this.state.profile) {
      // TODO: check for first-time login profile
      component = null;
    } else {
      console.log(this.state.profile);
      component = <PlaceholderProfile profile={this.state.profile} />;
    }

    return <div>{component}</div>;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(MyProfile);
