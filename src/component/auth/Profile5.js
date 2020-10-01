import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import { Row, Col, Menu } from "antd";
import { Typography } from "antd";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

// const { Content, Sider } = Layout;
const { Dragger } = Upload;

class Profile5 extends Component {
  state = {
    profile: {},
    tabdisp: "about",
    canEdit: false,
  };

  uploadProps = {
    name: "file",
    //   accept: ".doc,.docx,.png,.pdf,.jpg",
    action: "/api/file/upload/",
    headers: {
      "x-auth-token": "",
    },
    fileList: [],
    onChange: this.handleChange,
  };

  // Tab click event handler
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ tabdisp: e.key });
  };
  handleButtonClick = () => {
    this.setState({
      canEdit: !this.state.canEdit,
    });
  };

  handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    let fileList = [...info.fileList];
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    // this.setState({ profile.files });
  };

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    axios
      .get("/api/file/getlist")
      .then((res) => (this.uploadProps.fileList = res.data));
    this.uploadProps.headers = { "x-auth-token": this.props.token };
  };

  // Text Editor
  setEditableStr = (property, str) => {
    var temp = { ...this.state.profile };
    temp[property] = str;
    this.setState({ profile: temp });
  };

  //Text Editor in arrays
  setEditableStrArr = (property, index, str) => {
    var temp = { ...this.state.profile };
    temp[property][index] = str;
    this.setState({ profile: temp });
  };

  getElements(lst, property) {
    if (lst) {
      return lst.map((item, index) => (
        <Paragraph
          className="psize"
          editable={
            this.state.canEdit
              ? {
                  onChange: (e) => this.setEditableStrArr(property, index, e),
                }
              : false
          }
        >
          {item}
        </Paragraph>
      ));
    }
  }

  displayProfileSeg = () => {
    if (this.state.tabdisp === "about") {
      return (
        <div>
          <Title className="h1size">About Me</Title>
          <div>
            <Paragraph
              className="psize"
              editable={
                this.state.canEdit
                  ? {
                      onChange: (e) => this.setEditableStr("about", e),
                    }
                  : false
              }
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              {this.state.profile.about}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "achievements") {
      return (
        <div>
          <Title className="h1size">Achievements</Title>
          <div>
            <Paragraph>
              {this.getElements(
                this.state.profile.achievements,
                "achievements"
              )}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "skills") {
      return (
        <div>
          <Title className="h1size">Skills</Title>
          <div>
            <Paragraph className="psize">
              {this.getElements(this.state.profile.keySkills, "keySkills")}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "projects") {
      return (
        <div>
          <Title className="h1size">Projects</Title>
          <div>
            <Dragger {...this.uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Upload your documents here!</p>
            </Dragger>
          </div>
        </div>
      );
    }
  };

  render() {
    const { current } = this.state.tabdisp;

    const editButt = (
      <Fragment>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          onClick={this.handleButtonClick}
          style={{ height: 50, color: "blue" }}
        >
          {this.state.canEdit ? "Save" : "Edit"}
        </button>
      </Fragment>
    );

    return (
      <div className="container-fluid ml-n3">
        <Row>
          <Col flex={1}>
            <div className="prof5">
              <div className="container-fluid prof5-img">
                <img
                  src={this.state.profile.image}
                  aria-hidden
                  alt="description of image"
                  className="mt-4 "
                />
              </div>
              <div className="prof5-img">
                <Title className=" text-center">
                  {" "}
                  {ProfileData.getName(this.state.profile)}
                </Title>
                <Paragraph
                  className={"text-center"}
                  editable={
                    this.state.canEdit
                      ? {
                          onChange: (e) => this.setEditableStr("subtitle", e),
                        }
                      : false
                  }
                >
                  {this.state.profile.subtitle}
                </Paragraph>
              </div>
              <div>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[current]}
                  mode="vertical"
                  style={{ backgroundColor: "coral" }}
                  className="text-center"
                >
                  <Menu.Item key="about" className="modified-item">
                    About Me
                  </Menu.Item>
                  <Menu.Item key="achievements" className="modified-item">
                    Achievements
                  </Menu.Item>
                  <Menu.Item key="skills" className="modified-item">
                    Skills
                  </Menu.Item>
                  <Menu.Item key="projects" className="modified-item">
                    Projects
                  </Menu.Item>
                </Menu>
              </div>
            </div>
          </Col>
          <Col offset={2} flex={5} className="prof5-about ml-n3">
            {this.displayProfileSeg()}
          </Col>

          {/* Need to add auth check here */}
          {editButt}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(Profile5);
