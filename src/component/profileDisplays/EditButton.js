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
        {this.props.isMyProfile ? (
          <Button
            type="primary"
            data-toggle="collapse"
            data-target="#mobile-nav"
            onClick={() => this.handleEditButtonClick()}
          >
            {this.props.canEdit ? "Done" : "Edit"}
          </Button>
        ) : null}
      </Fragment>
    );
  }
}
export default EditButton;
