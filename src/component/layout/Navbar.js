import React, { Component, Fragment } from "react";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

import * as ProfileData from "../../api/ProfileData";
import { Menu, Col, Space } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    mobileView: false,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.resize = ProfileData.resize.bind(this);
  }

  componentDidMount() {
    //Size check.
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

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
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          top: "0",
          width: "100%",
          display: "flex",
          justifyContent: !this.mobileView ? "flex-end" : "normal",
        }}
      >
        <Menu.Item
          key="mail"
          icon={<MailOutlined />}
          style={{ marginRight: "auto" }}
        >
          Navigation One
        </Menu.Item>
        <Space size="large" />
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Navigation Three - Submenu"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>

      // <Row className="nav-height" style={{ background: "black" }}>
      //   <Col offset={1}>
      //     <Link className="navbar-brand text-light" to="/">
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
      //   </Col>
      //   <Col flex="auto">
      //     <Row justify="end">
      //       <Col>
      //         <Link className="nav-link text-light" to="/about">
      //           {" "}
      //           About
      //         </Link>
      //       </Col>
      //       <Col>
      //         <Link className="nav-link text-light" to="/browse">
      //           {" "}
      //           Browse
      //         </Link>
      //       </Col>
      //       <Col>
      //         <Link className="nav-link text-light" to="/my-profile">
      //           {" "}
      //           My Profile
      //         </Link>
      //       </Col>
      //       {isAuthenticated ? authLinks : guestLinks}
      //     </Row>
      //   </Col>
      // </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);
