import React, { Component, Fragment } from "react";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome, ${user.name}!` : ""}</strong>
          </span>
        </li>
        <Logout />
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            {" "}
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            {" "}
            Login
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
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
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {" "}
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/browse">
                {" "}
                Browse
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-profile">
                {" "}
                My Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Help
              </Link>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);
