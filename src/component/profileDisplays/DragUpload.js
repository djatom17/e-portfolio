import React, { Component, Fragment } from "react";
import { Upload, message, Form, Modal, Input, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

export class DragUpload extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  //Properties for the dragger component
  uploadProps = {
    name: "file",
    action: "/api/file/upload/",
    headers: {
      "x-auth-token": "",
    },
    // fileList: [],
    onChange: this.handleChange,
    customRequest: ({ file }) => {
      // console.log(file);
      const data = new FormData();
      data.append("file", file);
      axios
        .post("/api/file/upload", data, {
          headers: {
            "x-auth-token": this.props.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log("Upload successful.", res))
        .catch((err) => console.log("Upload unsuccessful. ", err));
    },
  };

  handleChange = (info) => {
    console.log("uploading", info);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    // let fileList = [...info.fileList];
    // fileList = fileList.map((file) => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });
    // // this.setState({ profile.files });
  };
  componentDidMount = () => {
    this.uploadProps.headers = { "x-auth-token": this.props.token };
    // this.uploadProps.fileList = this.props.profile.filesAndDocs.map(
    //   (item, index) => ({ ...item, uid: index })
    // );
  };

  render() {
    return (
      <Fragment>
        <Button type="primary" onClick={this.showModal}>
          Add a new Project!
        </Button>
        <Modal
          visible={this.state.visible}
          title="Add New Project"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="save"
              type="primary"
              loading={this.state.loading}
              onClick={(e) => this.props.handleOk(this.state.layout, e)}
            >
              Submit
            </Button>,
          ]}
        >
          <Form name="Projects">
            <Form.Item
              label="Project Name"
              name="name"
              rules={[
                { required: true, message: "Please input your roject name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="description"
              rules={[
                { required: true, message: "Please input your roject name!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
          <Dragger {...this.uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Upload your documents here!</p>
          </Dragger>
        </Modal>
      </Fragment>
    );
  }
}
export default DragUpload;
