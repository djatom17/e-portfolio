import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from '../../api/ProfileData';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';

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
                                </div>
                                <Tabs defaultTab="basic-tab-one">
                                    <TabList>
                                    <Tab tabFor="basic-tab-one">About me</Tab>
                                    <Tab tabFor="basic-tab-two">Achievements</Tab>
                                    </TabList>
                                    <TabPanel tabId="basic-tab-one">
                                    <div className="tab-inner">
                                    <h1 className="display-5 browse-name ">
                                      About me
                                    </h1>
                                    <p>
                                        {this.state.profile.about}
                                    </p>
                                    </div>
                                    </TabPanel>
                                    <TabPanel tabId="basic-tab-two">
                                    <div className="tab-inner">
                                    <h1 className="display-5 browse-name">
                                      Achievments
                                    </h1>
                                      {ProfileData.getElements(this.state.profile.achievements)}
                                    </div>
                                    </TabPanel>
                                    
                                </Tabs>

                              <div className = "text-left social-media-links">
                              <h3>
                                  Social Media Links
                              </h3>
                              <div>
                                  <p>
                                      {ProfileData.getElements(this.state.profile.social)}
                                  </p>
                              </div>
                              </div>
                            </div>
                            <p>

                            </p>

                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Profile2;
