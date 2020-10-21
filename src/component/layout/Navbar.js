import React, { Component, Fragment } from "react";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Col, Row } from "antd";

import { Link } from "react-router-dom";

class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // const { current } = this.state;

    const authLinks = (
      <Fragment>
        <Col className="nav-link text-light">
          {user ? `Welcome, ${user.name}!` : ""}
        </Col>
        <Col>
          <Logout />
        </Col>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <Col>
          <Link className="nav-link text-light" to="/register">
            {" "}
            Sign Up
          </Link>
        </Col>
        <Col>
          <Link className="nav-link text-light" to="/login">
            {" "}
            Login
          </Link>
        </Col>
      </Fragment>
    );

    return (
      <Row className="nav-height" style={{ background: "black" }}>
        <Col offset={1}>
          <Link className="navbar-brand text-light" to="/">
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
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Col>
              <Link className="nav-link text-light" to="/about">
                {" "}
                About
              </Link>
            </Col>
            <Col>
              <Link className="nav-link text-light" to="/browse">
                {" "}
                Browse
              </Link>
            </Col>
            <Col>
              <Link className="nav-link text-light" to="/my-profile">
                {" "}
                My Profile
              </Link>
            </Col>
            {isAuthenticated ? authLinks : guestLinks}
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);
