import React, { Component, Fragment } from "react";
import { Upload, message, Form, Modal, Input, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
const { Dragger } = Upload;

class DragUpload extends Component {
  state = {
    visible: false,
    uploading: false,
    fileList: [],
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false, fileList: [] });
  };

  handleUploadSuccess = () => {
    let countdown = 3;
    const successModal = Modal.success({
      title: "Upload success!",
      content: `Your project has been uploaded! This notification will close in ${countdown} second${
        countdown === 1 ? "" : "s"
      }.`,
    });
    const timer = setInterval(() => {
      countdown -= 1;
      successModal.update({
        content: `Your project has been uploaded! This notification will close in ${countdown} second${
          countdown === 1 ? "" : "s"
        }.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      successModal.destroy();
    }, countdown * 1000);
  };

  handleUpload = (values) => {
    const { fileList } = this.state;
    const formData = new FormData();

    // If allow multiple files
    // fileList.forEach(file => {
    //   formData.append('files[]', file);
    // });
    formData.append("file", fileList[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);

    const headers = {
      "x-auth-token": this.props.token,
      "Content-Type": "multipart/form-data",
    };

    headers["x-cert"] = this.props.isCert ? "true" : "false";

    this.setState({ uploading: true });

    axios
      .post("/api/file/upload", formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.error) {
          this.setState({ uploading: false });
          console.log("upload fail");
        } else {
          this.setState({ fileList: [], uploading: false, visible: false });
          console.log("upload success");

          // Show success dialog box
          this.handleUploadSuccess();

          // Update parent list
          this.props.onChange(
            values.name,
            fileList[0].name,
            response.data.fileUrl,
            values.description
          );
        }
      });
  };

  render() {
    // Obtain information from state.
    const { uploading, fileList } = this.state;

    // Initialise the props required by the Dragger component being used for upload.
    const draggerProps = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Fragment>
        <Button type="primary" onClick={this.showModal}>
          {this.props.isCert ? "Add a new Certificate!" : "Add a new Project!"}
        </Button>
        <Modal
          visible={this.state.visible}
          title={this.props.isCert ? "Add new Certificate" : "Add new Project"}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={uploading}
              htmlType="submit"
              disabled={fileList.length === 0}
              form={this.props.isCert ? "certForm" : "projectForm"}
            >
              {uploading
                ? "Uploading"
                : this.props.isCert
                ? "Add Certificate"
                : "Add Project"}
            </Button>,
          ]}
        >
          <Form
            id={this.props.isCert ? "certForm" : "projectForm"}
            name={this.props.isCert ? "Certificates" : "Projects"}
            onFinish={this.handleUpload}
          >
            <Form.Item
              label={this.props.isCert ? "Certificate Name" : "Project Name"}
              name="name"
              rules={[
                {
                  required: true,
                  message: this.props.isCert
                    ? "Please name your certificate"
                    : "Please name your project!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                this.props.isCert
                  ? "Certificate Description"
                  : "Project Description"
              }
              name="description"
              rules={[
                {
                  required: true,
                  message: this.props.isCert
                    ? "Please describe your certificate"
                    : "Please describe your project!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click to browse for files or drag-and-drop here
            </p>
            <p className="ant-upload-hint">Upload your documents here!</p>
          </Dragger>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(DragUpload);
