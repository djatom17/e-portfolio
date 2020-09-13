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
                            <h6 className="theme-color lead">"We live in a society" Gotham Hero</h6>
                            <br/>
                            <p> Local Legend | Tech Enthusiast | Volunteer at Orphanage</p>
                            <br />

                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <p>Defeated The Joker x24</p>
                                    </div>
                                    <div className="media">
                                        <p>Defeated The Riddler x16</p>
                                    </div>
                                    <div className="media">
                                        <p>Mentor to Robin</p>
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
                                        <p>BillionaireBruce</p>
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
                            <img src="/image/placeholderImages/placeholder3.png" aria-hidden alt="description of image"/>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <h3 className="display-5 text-lg">
                        About me
                    </h3>
                    <div className="container text-lg-left">
                        <p>
                        World-celebrated CEO, in Manhattan, New York, a famous genius inventor and businessman,  a New York socialite and philanthropist. Well known as a video game designer and inventor of BatUtilityBelt, and lived a eco-friendly lifestyle.

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
                                <p className="m-0px font-w-600">http://facebook/therealbatman</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h4" data-to="500" data-speed="500">LinkedIn</h6>
                                <p className="m-0px font-w-600">http://LinkedIn/therealbatman</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile3;
