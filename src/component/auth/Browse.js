import React from 'react';
import { Link } from "react-router-dom";

import placeholder from './../../img/placeholder.png';
import placeholder2 from './../../img/placeholder2.png';
import placeholder3 from './../../img/placeholder3.png';
import placeholder4 from './../../img/placeholder4.jpg';

const Browse = () => {
    return (
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
                            <div className="container browse-inner">
                                <div className="container browse-profile-picture">
                                    <img src={placeholder} class="rounded float-left" aria-hidden alt="description of image"/>
                                </div>
                                <div className="container browse-profile-summary">
                                    <h1 className="browse-name">
                                        Anuja Nautreel
                                    </h1>
                                    <p className="browse-details">
                                        Lead 3D Artist @ UnrealVirtualGames
                                    </p>
                                    <p className="browse-details">
                                        Master of Animation @ RMIT
                                    </p>
                                    <p className="browse-details">
                                        Bachelor of Design @ University of Melbourne
                                    </p>
                                    <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
                                        Browse
                                    </Link>
                                    <Link to={"/login"} className={"btn btn-lg btn-light"}>
                                        Slide into her DM
                                    </Link>
                                </div>
                            </div>
                            <div className="container browse-inner">
                                <div className="container browse-profile-picture">
                                    <img src={placeholder2} class="rounded float-left" aria-hidden alt="description of image"/>
                                </div>
                                <div className="container browse-profile-summary">
                                    <h1 className="browse-name">
                                        John Smith
                                    </h1>
                                    <p className="browse-details">
                                        Machine Learning Engineer @ UnrealMachineLearning
                                    </p>
                                    <p className="browse-details">
                                        Master of IT @ La Trobe University
                                    </p>
                                    <p className="browse-details">
                                        Bachelor of Science @ University of Melbourne
                                    </p>
                                    <Link to="/profile2" className={"btn btn-lg btn-info mr-2"}>
                                        Browse
                                    </Link>
                                    <Link to={"/login"} className={"btn btn-lg btn-light"}>
                                        Slide into his DM
                                    </Link>
                                </div>
                            </div>
                            <div className="container browse-inner">
                                <div className="container browse-profile-picture">
                                    <img src={placeholder3} class="rounded float-left" aria-hidden alt="description of image"/>
                                </div>
                                <div className="container browse-profile-summary">
                                    <h1 className="browse-name">
                                        Bruce Wayne
                                    </h1>
                                    <p className="browse-details">
                                        CEO @ Wayne Enterprises
                                    </p>
                                    <p className="browse-details">
                                        Drop-out @ League of Assassins
                                    </p>
                                    <p className="browse-details">
                                        Master ninja @ League of Assassins
                                    </p>
                                    <Link to="/profile3" className={"btn btn-lg btn-info mr-2"}>
                                        Browse
                                    </Link>
                                    <Link to={"/login"} className={"btn btn-lg btn-light"}>
                                        Turn on Bat Signal
                                    </Link>
                                </div>
                            </div>
                            <div className="container browse-inner">
                                <div className="container browse-profile-picture">
                                    <img src={placeholder4} class="rounded float-left" aria-hidden alt="description of image"/>
                                </div>
                                <div className="container browse-profile-summary">
                                    <h1 className="browse-name">
                                        Билли Айлиш
                                    </h1>
                                    <p className="browse-details">
                                        CEO @ Ctrl Alt Elite
                                    </p>
                                    <p className="browse-details">
                                        Master of IT @ University of Melbourne
                                    </p>
                                    <p className="browse-details">
                                        Bachelor of Science @ University of Melbourne
                                    </p>
                                    <Link to="/profile4" className={"btn btn-lg btn-info mr-2"}>
                                        Browse
                                    </Link>
                                    <Link to={"/login"} className={"btn btn-lg btn-light"}>
                                        Slide into her DM
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browse;