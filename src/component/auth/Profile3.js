import React from 'react';

import "./profile3.css";

const Profile3 = () => {

    return (

        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">Bruce Wayne's Flex</h3>
                            <h6 className="theme-color lead">"Fart take a while to escape a rubber suit" Gothem Hero</h6>
                            <br/>
                            <p> When people look at me, they automatically assume I'm dark and weird.
                                Why can't they see the truth?
                                I'm just a girl, trying to find my place in the world.
                            </p>
                            <br />

                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <p>League of Legends avg kda: 3/11.4/7.2</p>
                                    </div>
                                    <div className="media">
                                        <p>Main Champ: Zed (Top 80% OCE)</p>
                                    </div>
                                    <div className="media">
                                        <p>Cheering Team: T1 SKT (the best)</p>
                                    </div>
                                    <div className="media">

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>LuciousFox@wayne.com</p>
                                    </div>
                                    <div className="media">
                                        <label>Contact</label>
                                        <p>Bat-Signal</p>
                                    </div>
                                    <div className="media">
                                        <label>MySpace</label>
                                        <p>BillionAirPlayBoyBruce</p>
                                    </div>
                                    <div className="media">
                                        <label>Justice</label>
                                        <p>Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src={require("../../img/placeholder3.png")} />
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <h3 className="display-5 text-lg">
                        Description Text
                    </h3>
                    <div className="container text-lg-left">
                        <p>
                            She wasn’t soft or pretty; she was hard-edged and cold,
                            like one of those cold bronze statues surrounded by high fences and crowned
                            in razor wire. Don’t touch me, such defenses said, but it wasn’t enough to
                            halt a breach, no. She had thought people only picked the soft-petaled,
                            sweet-smelling flowers, but some people took thorns as a challenge.
                        </p>
                    </div>
                    <br />
                    <h3 className="display-5 text-lg">
                        Social Media Links
                    </h3>
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h4" data-to="500" data-speed="500">Facebook</h6>
                                <p className="m-0px font-w-600">http://</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h4" data-to="500" data-speed="500">LinkedIn</h6>
                                <p className="m-0px font-w-600">http://</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h4" data-to="500" data-speed="500">Minecraft Sever</h6>
                                <p className="m-0px font-w-600">http://BatCave12</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile3;