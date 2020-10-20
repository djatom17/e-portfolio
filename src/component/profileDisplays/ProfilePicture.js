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
    const pfp = <img src={this.props.image} alt="pfp" className="mt-4 "></img>;

    // upload button that appears while hovering in edit mode
    const uploadButton = <Upload> Change </Upload>;

    return (
      <Col
        flex="200px"
        onMouseEnter={() => this.onEnterPFP()}
        onMouseLeave={() => this.onLeavePFP()}
      >
        {pfp}
        {this.props.isMyProfile && this.props.canEdit && !pfpVisible
          ? uploadButton
          : null}
      </Col>
    );
  }
}
export default ProfilePicture;
