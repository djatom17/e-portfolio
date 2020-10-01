import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from "../../api/ProfileData";
class Profile4 extends Component {
  state = {
    profile: {},
  };

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
  };

  render() {
    return (
      <div>
        <section>
          <div className="profile4">
            <div className="profile4-overlay text-light">
              <div className={"container"}>
                <div className={"row"}>
                  <div className="col-mid-8 m-auto">
                    <h1 className="display-4 text-center">
                      {ProfileData.getName(this.state.profile)}'s Flex page
                    </h1>
                    <p className={"lead text-center"}>
                      {this.state.profile.subtitle}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="browse-profile-summary">
                    <h1 className="display-5 browse-name">Little bout me..</h1>
                    <div className="browse-profile-summary">
                      <p className={"lead text-center"}>
                        {this.state.profile.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className={"row"}>
              <div className="browse-profile-summary">
                <h1 className="display-5 browse-name">
                  My life time Achievements!
                </h1>
              </div>
            </div>
            <div className={"row"}>
              <div className="browse-profile-summary">
                <p className={"lead text-left"}>My Github Repos:</p>
                <p className={"lead text-center"}>
                  Public project I worked on:
                </p>
                <p className={"lead text-left"}>Minecraft Sever:</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile4;
