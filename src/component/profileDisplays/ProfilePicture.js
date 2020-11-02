import React, { Component, Fragment } from "react";
import { Col, Upload, Button, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import { UserOutlined } from "@ant-design/icons";

export class ProfilePicture extends Component {
  state = {
    showPFPChangeButton: false,
    pfpEdit: false,
    fileList: [],
  };

  // pfp hovering methods
  onEnterPFP = () => {
    this.setState({ showPFPChangeButton: true });
  };

  onLeavePFP = () => {
    this.setState({ showPFPChangeButton: false });
  };

  handleCrop = () => {
    this.setState({ pfpEdit: true });
    return true;
  };

  render() {
    const { showPFPChangeButton, fileList, pfpEdit } = this.state;

    const uploadProps = {
      beforeUpload: (file) => {
        this.setState({ pfpEdit: false });
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
      <ImgCrop modalOk="Confirm" rotate={true} beforeCrop={this.handleCrop}>
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
        onMouseEnter={this.onEnterPFP}
        onMouseLeave={this.onLeavePFP}
      >
        {pfp}
        {(this.props.isMyProfile &&
          this.props.canEdit &&
          showPFPChangeButton) ||
        pfpEdit
          ? uploadButton
          : null}
      </Col>
    );
  }
}
export default ProfilePicture;
