import React, { Component } from 'react';
import {Link} from "react-router-dom";
// import axios from 'axios';
import Api from '../../Api';

class Profile extends Component
{
    profileID = "5f62ba079f21c8be9afd18b0";

    state = {
        profile : {}
    };

    constructor(props)
    {
        super(props);
    }

    componentDidMount = () => {
        Api.getProfile(this.profileID, (res) => {
            this.setState({profiles: res});
        });
    };

    // getProfile = () => {
    //     axios.get('/info/p/' + this.profileID)
    //     .then((res) => {
    //         const data = res.data;
    //         this.setState({ profile : data });
    //     });
    // };
    
    render()
    {
        return (
            <div className="profile">
                <div className="container">
                    <div className={"row"}>
                        <div className="col-mid-8 m-auto">
                            <h1 className="display-4 text-center"> {Api.getName(this.state.profile)} Flex page</h1>
                            <p className={"lead text-center"}>
                                {this.state.profile.subtitle}
                            </p>
                            <div className="container browse-outer">
                                <div className="container browse-profile-picture">
                                    <img src={this.state.profile.image} aria-hidden alt="description of image"/>
                                </div>
                                <div className="container browse-profile-summary">
                                    <h1 className="display-5 browse-name">
                                        Achievements
                                    </h1>
                                    <div className="container browse-profile-summary">
                                        {Api.getElements(this.state.profile.achievements)}
                                    </div>
                                </div>
                            </div>
                            <p>

                            </p>
                            <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
                                Edit
                            </Link>
                            <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
                                Upload
                            </Link>
                            <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
                                Message
                            </Link>
                            <p>

                            </p>
                            <h1 className="display-5 text-lg">
                                About Me
                            </h1>
                            <div className="container browse-profile-summary">
                                <p>
                                    {this.state.profile.about}
                                </p>
                            </div>
                            <h1 className="display-5 text-lg">
                                Social Media Links
                            </h1>
                            <div className="container browse-profile-summary">
                                {Api.getElements(this.state.profile.social)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
