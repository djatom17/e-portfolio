import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Browse extends Component
{
    state = {
        profiles : []
    };

    constructor(props)
    {
        super(props);
    }

    componentDidMount = () => {
        this.getProfiles();
    };

    getProfiles = () => {
        axios.get('/info/profiles')
        .then((res) => {
            const data = res.data;
            this.setState({ profiles : data });
            console.log("data received");
        });
    }

    displayProfile = (profiles) => {
        if (!profiles.length) return null;
        return profiles.map((profile, index) => (
            <div className="container browse-inner">
                <div className="container browse-profile-picture">
                    <img src={profile.image} class="rounded float-left" aria-hidden alt="description of image"/>
                </div>
                <div className="container browse-profile-summary">
                    <h1 className="browse-name">
                        {profile.firstName.concat(' ', profile.lastName)}
                    </h1>
                    <p className="browse-details">
                        {profile.keySkills.toString()}
                    </p>
                    <p className="browse-details">
                        {profile.workHistory.toString()}
                    </p>
                    <p className="browse-details">
                        {profile.education.toString()}
                    </p>
                    <Link to={profile.linkToProfile} className={"btn btn-lg btn-info mr-2"}>
                        Browse
                    </Link>
                    <Link to={"/login"} className={"btn btn-lg btn-light"}>
                        Send Message
                    </Link>
                </div>
            </div>
        ));
    };

    render() 
    {
        return(
        <div className="browse">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-4 text-center">
                            {' '}
                            Browse to your heart's content!
                        </h1>
                        <p/>
                        <div className="container browse-outer">
                            {this.displayProfile(this.state.profiles)}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Browse;
