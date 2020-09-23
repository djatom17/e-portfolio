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
      <li className="nav-item">
        <Link className="nav-link" to="#" onClick={this.props.logout}>
          {" "}
          Logout
        </Link>
      </li>
    );
  }
}

export default connect(null, { logout })(Logout);
