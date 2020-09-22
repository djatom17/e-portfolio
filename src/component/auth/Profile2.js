import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from '../../api/ProfileData';
import {Tabs, Tab} from 'react-bootstrap-tabs';

class Profile2 extends Component
{
    profileID = "5f62d33045ba55eac1d4614d"
    state = {
        profile : {}
    };

    componentDidMount = () => {
        ProfileData.getProfile(this.profileID, (res) => {
            this.setState({profile: res});
        });
    };

    render(){
        return (
            <div className="profile">

                <div className="container">

                    <div className="row">

                        <div className="col-mid-8 m-auto">
                            <h1 className="display-4 text-center">{ProfileData.getName(this.state.profile)}</h1>
                            <p className="lead text-center">
                                {this.state.profile.subtitle}
                            </p>
                            <div className="container browse-outer">
                                <div className="container browse-profile-picture">
                                    <img src={this.state.profile.image} aria-hidden alt="description of image"/>

                                <Tabs onSelect={(index, label) => console.log(label + ' selected')} className = "testing-tab">
                                  <Tab label="About Me">
                                  <h1 className="display-5 text-lg">
                                      About me
                                  </h1>
                                  <div className="container browse-profile-summary testing-inner2">
                                      <p>
                                          {this.state.profile.about}
                                      </p>
                                  </div>
                                  </Tab>

                                  <Tab label="Achievements">
                                  <h1 className="display-5 browse-name ">
                                      Achievments
                                  </h1>
                                  <div className="container browse-profile-summary testing-inner2">
                                      {ProfileData.getElements(this.state.profile.achievements)}
                                  </div>
                                  </Tab>

                                </Tabs>
                                </div>

                              <h1 className="display-5 text-lg">
                                  Social Media Links
                              </h1>
                            </div>
                            <p>

                            </p>

                            <h1 className="display-5 text-lg">
                                About me
                            </h1>


                            <div className="container browse-profile-summary">
                                <p>
                                    {ProfileData.getElements(this.state.profile.social)}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Profile2;
