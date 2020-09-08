import React from 'react';
import placeholder from "../../img/placeholder.png";

const Profile = () => {

    return (
        <div className={"register"}>
            <div className={"container"}>
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
                                        League of Legends avg kda: 15.3/8.9/1.2
                                    </p>
                                    <p>
                                        Main Champ: Teemo (Top 8% OCE)
                                    </p>
                                    <p>
                                        Cheering Team: T1 SKT (the best)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p>

                        </p>
                        <h1 className="display-5 text-lg">
                            Description Text
                        </h1>
                        <div className="container browse-profile-summary">
                            <p>
                                As a child I realized you cannot be accepted in a society.
                                But you can accept programming.
                                Programming doesn’t care about your gender nor ur identity,
                                I feel truly accepted when I program.
                                Fresh out of rehab, let us code together :()

                            </p>
                        </div>
                        <h1 className="display-5 text-lg">
                            Social Media Links
                        </h1>
                        <div className="container browse-profile-summary">
                            <p>
                                Facebook:
                            </p>
                            <p>
                                LinkedIn:
                            </p>
                            <p>
                                Minecraft Sever:
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;