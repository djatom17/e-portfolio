import React, { Component, Fragment } from "react";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Menu, Col, Row } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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
        <Col className="nav-link">{user ? `Welcome, ${user.name}!` : ""}</Col>
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
            <Link className="nav-link" to="/register">
              {" "}
              Sign Up
            </Link>
          </Menu.Item>
        </Col>
        <Col>
          <Menu.Item>
            <Link className="nav-link" to="/login">
              {" "}
              Login
            </Link>
          </Menu.Item>
        </Col>
      </Fragment>
    );

    return (
      // <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
      //   <div className="container">
      //     <Link className="navbar-brand" to="/">
      //       Ctrl Alt Elite
      //     </Link>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#mobile-nav"
      //     >
      //       <span className="navbar-toggler-icon" />
      //     </button>
      //   </div>
      //   <div className="collapse navbar-collapse" id="mobile-nav">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item">
      // <Link className="nav-link" to="/about">
      //   {" "}
      //   About
      // </Link>
      //       </li>

      //       <li className="nav-item">
      // <Link className="nav-link" to="/browse">
      //   {" "}
      //   Browse
      // </Link>
      //       </li>

      //       <li className="nav-item">
      // <Link className="nav-link" to="/my-profile">
      //   {" "}
      //   My Profile
      // </Link>
      //       </li>

      //       <li className="nav-item">
      //         <Link className="nav-link" to="/profiles">
      //           {" "}
      //           Help
      //         </Link>
      //       </li>
      //       {isAuthenticated ? authLinks : guestLinks}
      //     </ul>
      //   </div>
      // </nav>

      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="nb"
      >
        <Row>
          <Col offset={1}>
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
          </Col>
          <Col flex="auto">
            <Row justify="end">
              <Col>
                <Menu.Item key="about">
                  <Link className="nav-link" to="/about">
                    {" "}
                    About
                  </Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="browse">
                  <Link className="nav-link" to="/browse">
                    {" "}
                    Browse
                  </Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="My Profile">
                  <Link className="nav-link" to="/my-profile">
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
