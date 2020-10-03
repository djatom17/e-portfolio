import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as ProfileData from "../../api/ProfileData";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import Settings from "./Settings";
import {
  Row,
  Col,
  Menu,
  Upload,
  message,
  Typography,
  Avatar,
  Input,
  Button,
  Modal,
  Tag,
} from "antd";
import {
  InboxOutlined,
  UserOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Axios from "axios";

const { Title, Paragraph } = Typography;

const { Dragger } = Upload;

class Profile5 extends Component {
  state = {
    profile: {},
    profileChanges: {},
    tabdisp: "about",
    canEdit: false,
    isMyProfile: false,
    loading: false,
    visible: false,
    layout: "0",
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  dragUpload = (
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

  uploadProps = {
    name: "file",
    //   accept: ".doc,.docx,.png,.pdf,.jpg",
    action: "/api/file/upload/",
    headers: {
      "x-auth-token": "",
    },
    // fileList: [],
    onChange: this.handleChange,
  };

  // Tab click event handler
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ tabdisp: e.key });
  };
  handleButtonClick = () => {
    // Make changes reflect on database
    ProfileData.updateProfile(
      this.state.profile._id,
      this.state.profileChanges,
      this.props.token
    );
    this.setState({
      canEdit: !this.state.canEdit,
      profileChanges: {},
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
    this.setState({ profile: this.props.profile });
    // this.uploadProps.fileList = this.props.profile.filesAndDocs.map(
    //   (item, index) => ({ ...item, uid: index })
    // );

    //Authorisation check.
    this.setState({ layout: this.props.profile.layout });
    this.uploadProps.headers = { "x-auth-token": this.props.token };
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  };

  // Text Editor
  setEditableStr = (property, str) => {
    var addChange = {};
    addChange[property] = str;
    this.setState({
      profileChanges: { ...this.state.profileChanges, ...addChange },
      profile: { ...this.state.profile, ...addChange },
    });
  };

  //Text Editor in arrays
  setEditableStrArr = (property, index, str) => {
    var temp = { ...this.state.profile };
    temp[property][index] = str;
    this.setState({ profile: temp });
  };

  // dynamic tag methods (delete, add, edit)
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleInputConfirm = (fieldName) => {
    //const { inputValue } = this.state;
    let { profile, inputValue, profileChanges } = this.state;

    // confirm if array, and item to be add is not empty
    // checks for duplicates, but maybe not do that here (?)
    if (
      inputValue &&
      profile[fieldName] &&
      profile[fieldName].indexOf(inputValue) === -1
    ) {
      profile[fieldName] = [...profile[fieldName], inputValue];
      profileChanges[fieldName] = [...profile[fieldName]];
    }
    console.log(profile[fieldName]);
    this.setState({
      profile,
      profileChanges,
      inputVisible: false,
      inputValue: "",
    });
  };

  handleCloseTag = (fieldName, removedTag) => {
    const field = this.state.profile[fieldName].filter(
      (tag) => tag !== removedTag
    );
    let { profile, profileChanges } = this.state;
    profile[fieldName] = field;
    profileChanges[fieldName] = field;
    this.setState({
      profile,
      profileChanges,
      editInputIndex: -1,
      editInputValue: "",
    });
    // this.setState({ editInputIndex: -1, editInputValue: "" });
  };

  handleEditInputConfirm = (fieldName) => {
    this.setState(({ profile, editInputIndex, editInputValue }) => {
      var newTags = [...profile[fieldName]];
      newTags[editInputIndex] = editInputValue;
      var addChange = {};
      addChange[fieldName] = newTags;

      return {
        profile: { ...this.state.profile, ...addChange },
        profileChanges: { ...this.state.profileChanges, ...addChange },
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  // delete button for achievements
  deleteButt = (item) => {
    return (
      <Button
        type="link"
        onClick={() => this.handleCloseTag("achievements", item)}
      >
        <DeleteOutlined />
      </Button>
    );
  };

  getElements(lst, property) {
    if (lst) {
      return lst.map((item, index) => (
        <Paragraph
          className="psize"
          editable={
            this.state.isMyProfile && this.state.canEdit
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

  //Modal  helper Functions
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (num, info) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);

    ProfileData.updateProfile(
      this.state.profile._id,
      { layout: num },
      this.props.token
    );
    window.location.reload();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  changeLayout = (str, info) => {
    this.setState({ layout: str });
  };
  // End of modal Functions

  getFiles(lst) {
    if (lst) {
      return lst.map((item, index) => (
        <div>
          <Link to={item.url}>
            <PaperClipOutlined />
            {item.name}
          </Link>
        </div>
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
                this.state.isMyProfile && this.state.canEdit
                  ? {
                      onChange: (e) => this.setEditableStr("about", e),
                    }
                  : false
              }
              ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
            >
              {this.state.profile.about}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "achievements") {
      const {
        inputVisible,
        inputValue,
        editInputIndex,
        editInputValue,
      } = this.state;

      return (
        <div>
          <Title className="h1size">Achievements</Title>
          <div>
            <Paragraph>
              {" "}
              {this.state.profile.achievements &&
                this.state.profile.achievements.map((item, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input.TextArea
                        ref={this.saveEditInputRef}
                        key={item}
                        size="large"
                        value={editInputValue}
                        onChange={this.handleEditInputChange}
                        onBlur={() =>
                          this.handleEditInputConfirm("achievements")
                        }
                        onPressEnter={() =>
                          this.handleEditInputConfirm("achievements")
                        }
                      />
                    );
                  }
                  const achievement = (
                    <Row>
                      <Col flex="auto">
                        <Paragraph key={item}>
                          <span
                            onDoubleClick={
                              this.state.isMyProfile &&
                              this.state.canEdit &&
                              ((e) => {
                                this.setState(
                                  {
                                    editInputIndex: index,
                                    editInputValue: item,
                                  },
                                  () => {
                                    this.editInput.focus();
                                  }
                                );
                                e.preventDefault();
                              })
                            }
                          >
                            {item}
                          </span>
                        </Paragraph>
                      </Col>
                      <Col flex="10px">
                        {this.state.isMyProfile && this.state.canEdit
                          ? this.deleteButt(item)
                          : null}
                      </Col>
                    </Row>
                  );
                  return achievement;
                })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={() => this.handleInputConfirm("achievements")}
                  onPressEnter={() => this.handleInputConfirm("achievements")}
                />
              )}
              {!inputVisible && this.state.isMyProfile && this.state.canEdit && (
                <Tag className="site-tag-plus" onClick={this.showInput}>
                  <PlusOutlined /> New Achievement
                </Tag>
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
            {this.state.isMyProfile && this.state.canEdit
              ? this.dragUpload
              : null}
            {console.log(this.state.isMyProfile)}
          </div>
          {this.getFiles(this.state.profile.filesAndDocs)}
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
          {this.state.isMyProfile && this.state.canEdit ? "Done" : "Edit"}
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
                    this.state.isMyProfile && this.state.canEdit
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
            {this.state.isMyProfile ? (
              <Settings
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                showModal={this.showModal}
                layout={this.state.layout}
                visible={this.state.visible}
                loading={this.state.loading}
              />
            ) : null}
          </Col>
          <Col>{this.state.isMyProfile ? editButt : null}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile5);
