import React, { Component, Fragment } from "react";
import { Col, Upload, Avatar } from "antd";
import "antd/dist/antd.css";

export class ProfilePicture extends Component {
  state = {
    pfpVisible: true,
  };

  // pfp hovering methods
  onEnterPFP = () => {
    this.setState({ pfpVisible: false });
  };

  onLeavePFP = () => {
    this.setState({ pfpVisible: true });
  };

  render() {
    const { pfpVisible } = this.state;

    // pfp present by default
    const pfp = (
      <Avatar alt="pfp" src={this.props.image} shape="square" size={200} />
    );

    // upload button that appears while hovering in edit mode
    const uploadButton = (
      <Avatar shape="square" size={200}>
        <Upload> Change </Upload>
      </Avatar>
    );

    return (
      <Col
        flex="200px"
        onMouseEnter={() => this.onEnterPFP()}
        onMouseLeave={() => this.onLeavePFP()}
      >
        {this.props.isMyProfile && this.props.canEdit && !pfpVisible
          ? uploadButton
          : pfp}
      </Col>
    );
  }
}
export default ProfilePicture;
