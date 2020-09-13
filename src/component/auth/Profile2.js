import React from 'react';

const Profile2 = () => {

    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-mid-8 m-auto">
                        <h1 className="display-4 text-center">John Smith's Flex</h1>
                        <p className="lead text-center">
                            "Never fear, for I is here" Hackers(1995)
                        </p>
                        <div className="container browse-outer">
                            <div className="container browse-profile-picture">
                                <img src="/image/placeholderImages/placeholder2.png" aria-hidden alt="description of image"/>
                            </div>
                            <div className="container browse-profile-summary">
                                <h1 className="display-5 browse-name">
                                    Achievments
                                </h1>
                                <div className="container browse-profile-summary">
                                    <p>
                                        Nobel Peace Prize Winner
                                    </p>
                                    <p>
                                        Oscar Winner
                                    </p>
                                    <p>
                                        Grammy Winner
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p>

                        </p>

                        <h1 className="display-5 text-lg">
                            About me
                        </h1>
                        <div className="container browse-profile-summary">
                            <p>
                                Inventor of RobotSpiders, working at Stark Industries.
                                I fell in love with software development at the age of 9 and the rest is history.

                            </p>
                        </div>
                        <h1 className="display-5 text-lg">
                            Social Media Links
                        </h1>
                        <div className="container browse-profile-summary">
                            <p>
                                Facebook: facebook.com/i3u4roiqef
                            </p>
                            <p>
                                LinkedIn: linkedin.com/i3u4roiqef
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile2;
