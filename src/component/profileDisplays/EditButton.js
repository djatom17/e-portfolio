import React, { Component, Fragment } from "react";
import { Modal, Button, Row, Col, Avatar } from "antd";
import "antd/dist/antd.css";
import * as ProfileData from "../../api/ProfileData";

export class EditButton extends Component {
  componentDidMount() {}
  //Edit Button
  handleEditButtonClick = () => {
    // Make changes reflect on database
    ProfileData.updateProfile(
      this.props._id,
      this.props.profileChanges,
      this.props.token
    );
    // this.props.changeEdit();
    this.props.changeEdit();
  };
  render() {
    return (
      <Fragment>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          onClick={() => this.handleEditButtonClick()}
          style={{ height: 50, color: "blue" }}
        >
          {this.props.isMyProfile && this.props.canEdit ? "Done" : "Edit"}
        </button>
      </Fragment>
    );
  }
}
export default EditButton;
