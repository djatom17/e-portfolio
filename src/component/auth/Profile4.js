import React from 'react';

const Profile4 = () => {

    return (
        <div>
            <section>
                <div className="profile4">
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className="col-mid-8 m-auto">
                                <h1 className="display-4 text-center">Билли Айлиш's Flex page</h1>
                                <p className={"lead text-center"}>
                                    "Computer dating is fine, if you're a computer"
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
                                        As a child I realized you cannot be accepted in a society.
                                        But you can accept programming.
                                        Programming doesn’t care about your gender nor ur identity,
                                        I feel truly accepted when I program.
                                        Fresh out of rehab, let us code together :()
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
};

export default Profile4;