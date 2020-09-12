import React from 'react';
import placeholder from "../../img/placeholder.png";
import {Link} from "react-router-dom";

const Profile = () => {

    return (
        <div className="profile">
            <div className="container">
                <div className={"row"}>
                    <div className="col-mid-8 m-auto">
                        <h1 className="display-4 text-center">Anuja Nautreel's Flex page</h1>
                        <p className={"lead text-center"}>
                            "Never fear, for I is here" Hackers(1995)
                        </p>
                        <div className="container browse-outer">
                            <div className="container browse-profile-picture">
                                <img src={placeholder} aria-hidden alt="description of image"/>
                            </div>
                            <div className="container browse-profile-summary">
                                <h1 className="display-5 browse-name">
                                    Achievments
                                </h1>
                                <div className="container browse-profile-summary">
                                    <p>
                                        Graduated with 4.0 GPA
                                    </p>
                                    <p>
                                        Charity Hackthon Winner
                                    </p>
                                    <p>
                                        Guinness World Record Holder
                                    </p>
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
                            Full stack developer with over 14 years of professional experience. Proficient in multiple programming languages including object oriented, procedural as well as functional programming.
                            Apart from working in silicon valley, I have also worked as a lecturer at The University of Melbourne for two years teaching history and geology subjects. I have  multiple PhD's in data science and I'm more than confident in my data wrangling as well was analysis skills . Although Solving complicated mathematical derivatives is a cake-walk, I struggle with the composition of organic chemistry elements. I have discovered the antidote to various deadly poisons caused by the the venomous reptiles in Africa while researching as an archeologist.

                            I have played basketball at the NBA as well as tennis at the Wimbledon. Despite serving in the army as a medic, I have received multiple accolades in long distance shooting including a silver medal at the Commonwealth Games. My next goal is to swim for my country at the Olympics but not before mastering the art of Taekwondo.

                            </p>
                        </div>
                        <h1 className="display-5 text-lg">
                            Social Media Links
                        </h1>
                        <div className="container browse-profile-summary">
                            <p>
                                facebook.com/ae394845
                            </p>
                            <p>
                                LinkedIn: linkedin.com/ae394845
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
