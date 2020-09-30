import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Link className="nav-link text-light" to="#" onClick={this.props.logout}>
        {" "}
        Logout
      </Link>
    );
  }
}

export default connect(null, { logout })(Logout);
