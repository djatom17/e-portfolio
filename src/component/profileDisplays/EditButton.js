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
        <Button
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: this.props.color ? this.props.color : "#40A9FF",
          }}
          type="link"
          data-toggle="collapse"
          data-target="#mobile-nav"
          onClick={() => this.handleEditButtonClick()}
        >
          {this.props.isMyProfile && this.props.canEdit
            ? "Save"
            : "Edit Profile"}
        </Button>
      </Fragment>
    );
  }
}
export default EditButton;
