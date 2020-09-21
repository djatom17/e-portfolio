import React, { Component } from 'react';
import {Link} from "react-router-dom";
// import axios from 'axios';
import Api from '../../Api';
class Profile4 extends Component
{
    profileID = "5f63035af4aa1e59a8d72bd0";

    state = {
        profile : {}
    };

    constructor(props)
    {
        super(props);
    }

    componentDidMount = () => {
        const data =Api.getProfile(this.profileID);
        console.log("check- ", data);
        this.setState({profile: data});
    };

    render()
    {
        return (
            <div>
                <section>
                    <div className="profile4">
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className="col-mid-8 m-auto">
                                    <h1 className="display-4 text-center">{Api.getName(this.state.profile)}'s Flex page</h1>
                                    <p className={"lead text-center"}>
                                        {this.state.profile.subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="browse-profile-summary">
                                    <h1 className="display-5 browse-name">
                                        Little bout me..
                                    </h1>
                                    <div className="browse-profile-summary">
                                        <p className={"lead text-center"}>
                                            {this.state.profile.about}
                                        </p>
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
                                <p className={"lead text-left"}>
                                    My Github Repos:
                                </p>
                                <p className={"lead text-center"}>
                                    Public project I worked on:
                                </p>
                                <p className={"lead text-left"}>
                                    Minecraft Sever:
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default Profile4;