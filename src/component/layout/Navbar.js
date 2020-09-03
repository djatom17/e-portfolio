import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
            <div className="container">
                <a className="navbar-brand" href="/">
                    CAE-Project
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
                        <a className="nav-link" href="profiles">
                            {' '}
                            Developers
                        </a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="register.html">
                            Sign Up
                        </a>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login.html">
                            Login
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;