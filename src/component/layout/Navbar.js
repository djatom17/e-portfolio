import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Ctrl Alt Elite
                </Link>
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
                        <Link className="nav-link" to="/about">
                            {' '}
                            About
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/browse">
                            {' '}
                            Browse
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                            {' '}
                            My Profile
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            {' '}
                            Sign Up
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            {' '}
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/profiles">
                            {' '}
                            Help
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
