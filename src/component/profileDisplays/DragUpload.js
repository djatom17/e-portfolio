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
      title: "Upload sucess!",
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

    this.setState({ uploading: true });

    axios
      .post("/api/file/upload", formData, {
        headers: {
          "x-auth-token": this.props.token,
          "Content-Type": "multipart/form-data",
        },
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
          Add a new Project!
        </Button>
        <Modal
          visible={this.state.visible}
          title="Add New Project"
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
              form="projectForm"
            >
              {uploading ? "Uploading" : "Add Project"}
            </Button>,
          ]}
        >
          <Form id="projectForm" name="Projects" onFinish={this.handleUpload}>
            <Form.Item
              label="Project Name"
              name="name"
              rules={[{ required: true, message: "Please name your project!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="description"
              rules={[
                { required: true, message: "Please describe your project!" },
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
