import React, { Component, Fragment } from "react";
import { Col, Upload, Button, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import { UserOutlined } from "@ant-design/icons";

export class ProfilePicture extends Component {
  state = {
    pfpVisible: true,
    fileList: [],
  };

  // pfp hovering methods
  onEnterPFP = () => {
    this.setState({ pfpVisible: false });
  };

  onLeavePFP = () => {
    this.setState({ pfpVisible: true });
  };

  render() {
    const { pfpVisible, fileList } = this.state;

    const uploadProps = {
      beforeUpload: (file) => {
        file.preview = window.URL.createObjectURL(file);
        this.props.onPFPChange(file);
        return false;
      },
      fileList,
    };

    // pfp present by default
    const pfp = (
      <Avatar alt="pfp" className="pfp" src={this.props.image} shape="square" />
    );

    // upload button that appears while hovering in edit mode
    const uploadButton = (
      <ImgCrop modalOk="Confirm" rotate={true}>
        <Upload className="pfp-button" {...uploadProps}>
          {!this.props.mobileView ? (
            <Button type="primary"> Change </Button>
          ) : (
            <Button type="primary" size="small" icon={<UserOutlined />} block />
          )}
        </Upload>
      </ImgCrop>
    );

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
