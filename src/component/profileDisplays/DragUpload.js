import React, { Component, Fragment } from "react";
import { Upload, message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import {
  InboxOutlined,
  UserOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Dragger } = Upload;

export class DragUpload extends Component {
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
        <Dragger {...this.uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Upload your documents here!</p>
        </Dragger>
      </Fragment>
    );
  }
}
export default DragUpload;
