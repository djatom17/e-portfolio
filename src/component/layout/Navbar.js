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
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

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
        <SubMenu key="SubMenu" title={user ? `Welcome, ${user.name}!` : ""}>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <Logout />
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            onClick={() => this.props.showSettings()}
          >
            <Link to="/my-profile"> Settings</Link>
          </Menu.Item>
        </SubMenu>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <Menu.Item key="register">
          <Link to="/register"> Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login"> Login</Link>
        </Menu.Item>
      </Fragment>
    );

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        theme="dark"
        mode="horizontal"
        style={{
          top: "0",
          width: "100%",
          display: "flex",
          justifyContent: !this.mobileView ? "flex-end" : "normal",
        }}
      >
        <Menu.Item key="home" style={{ marginRight: "auto" }}>
          <Link to="/">Ctrl Alt Elite</Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link to="/about"> About</Link>
        </Menu.Item>

        <Menu.Item key="browse">
          <Link to="/browse"> Browse</Link>
        </Menu.Item>

        <Menu.Item key="profile">
          <Link to="/my-profile"> My Profile</Link>
        </Menu.Item>

        {isAuthenticated ? authLinks : guestLinks}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);
