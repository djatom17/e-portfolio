import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <a className="navbar-brand" herf="landing.html">
                    OH-Project
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="profiles.html">
                            {' '}
                            Developers
                        </a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" herf="register.html">
                            Sign Up
                        </a>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link" herf="login.html">
                            Login
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;