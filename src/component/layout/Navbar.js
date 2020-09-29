import React, { Component, Fragment } from "react";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Menu, Col, Row } from "antd";

import { Link } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";

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
    const { current } = this.state;

    const { SubMenu } = Menu;

    const authLinks = (
      <Fragment>
        <Col className="nav-link text-light">
          {user ? `Welcome, ${user.name}!` : ""}
        </Col>
        <Col>
          <Menu.Item>
            <Logout />
          </Menu.Item>
        </Col>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <Col>
          <Menu.Item>
            <Link className="nav-link text-light" to="/register">
              {" "}
              Sign Up
            </Link>
          </Menu.Item>
        </Col>
        <Col>
          <Menu.Item>
            <Link className="nav-link text-light" to="/login">
              {" "}
              Login
            </Link>
          </Menu.Item>
        </Col>
      </Fragment>
    );

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="nb"
        theme="dark"
      >
        <Row className="mt-3">
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
                <Menu.Item key="about">
                  <Link className="nav-link text-light" to="/about">
                    {" "}
                    About
                  </Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="browse">
                  <Link className="nav-link text-light" to="/browse">
                    {" "}
                    Browse
                  </Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="My Profile">
                  <Link className="nav-link text-light" to="/my-profile">
                    {" "}
                    My Profile
                  </Link>
                </Menu.Item>
              </Col>
              {isAuthenticated ? authLinks : guestLinks}
            </Row>
          </Col>
        </Row>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);
