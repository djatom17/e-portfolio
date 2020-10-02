import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
// import {Link} from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from "../../api/ProfileData";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Input,
  Button,
  Divider,
  Tabs,
  Form,
  Upload,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// functions for img upload
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

// function for tabs
function callback(key) {
  console.log(key);
}

class Profile3 extends Component {
  state = {
    profile: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
    loading: false,
    pfpVisible: true,
    canEdit: false,
    isMyProfile: false,
  };

  // functions for editing text
  setEditableStr = (value, str) => {
    var temp = { ...this.state.profile };
    temp[value] = str;
    this.setState({ profile: temp });
  };

  setEditableStrArr = (property, index, str) => {
    var temp = { ...this.state.profile };
    temp[property][index] = str;
    this.setState({ profile: temp });
  };

  handleButtonClick = () => {
    this.setState({
      canEdit: !this.state.canEdit,
    });
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

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });

    //Authorisation check.
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  };

  // dynamic tag methods (delete, add, edit)
  handleCloseTag = (str, removedTag) => {
    const field = this.state.profile[str].filter((tag) => tag !== removedTag);
    var profile = this.state.profile;
    profile[str] = field;
    this.setState({ profile });
    this.setState({ editInputIndex: -1, editInputValue: "" });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = (str) => {
    const { inputValue } = this.state;
    let { profile } = this.state;
    if (inputValue && profile[str] && profile[str].indexOf(inputValue) === -1) {
      profile[str] = [...profile[str], inputValue];
    }
    console.log(profile[str]);
    this.setState({
      profile,
      inputVisible: false,
      inputValue: "",
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = (str) => {
    this.setState(({ profile, tags, editInputIndex, editInputValue }) => {
      const newTags = [...profile[str]];
      newTags[editInputIndex] = editInputValue;
      var temp = { ...this.state.profile };
      temp[str] = newTags;

      return {
        profile: temp,
        tags: newTags,
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

  // pfp hovering methods
  onEnterPFP = () => {
    this.setState({ pfpVisible: false });
  };

  onLeavePFP = () => {
    this.setState({ pfpVisible: true });
  };

  // pfp image upload methods
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    // for tags
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
      pfpVisible,
    } = this.state;

    // pfp
    const pfp = (
      <Avatar
        alt="pfp"
        src={this.state.profile.image}
        shape="square"
        size={200}
      />
    );

    // upload button
    const uploadButton = (
      <Avatar shape="square" size={200}>
        <Upload> Change </Upload>
      </Avatar>
    );

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
          {this.state.canEdit ? "Done" : "Edit"}
        </button>
      </Fragment>
    );

    return (
      <div clasName="container-fluid mx-4">
        {/* row contains: name, curr job */}

        <Row className=" mt-4 ml-5" justify="space-between">
          <Col>
            <h2>
              {ProfileData.getName(this.state.profile)}
              {", "}
              <small>[get job from db]</small>
            </h2>
          </Col>
          <Col className="mr-5">
            {this.state.isMyProfile ? editButt : null}{" "}
            {console.log(this.state.isMyProfile)}
          </Col>
        </Row>
        {/* row contains: pfp, about me, social media icons */}
        <Row justify="space-around" gutter={24} className="mx-5">
          <Col
            flex="200px"
            onMouseEnter={() => this.onEnterPFP()}
            onMouseLeave={() => this.onLeavePFP()}
          >
            {" "}
            {this.state.isMyProfile && this.state.canEdit && !pfpVisible
              ? uploadButton
              : pfp}
          </Col>
          <Col xs={4} sm={6} md={10} lg={14} xl={16}>
            <h4>A little bit about me...</h4>
            <Paragraph
              editable={
                this.state.canEdit
                  ? {
                      onChange: (str) => this.setEditableStr("about", str),
                      autoSize: { minRows: 1, maxRows: 5 },
                    }
                  : false
              }
            >
              {this.state.profile.about}
            </Paragraph>
          </Col>
          <Col>
            <Row>
              <Button
                type="link"
                icon={<LinkedinOutlined />}
                className="mt-3"
              />
            </Row>
            <Row>
              {" "}
              <Button type="link" icon={<TwitterOutlined />} className="mt-3" />
            </Row>
            <Row>
              <Button type="link" icon={<GithubOutlined />} className="mt-3" />
            </Row>
          </Col>
        </Row>
        <Divider />

        {/* row contains: tabs  */}
        {/* tab 1: achievements */}
        <Row className=" my-4 ml-5">
          <Tabs onChange={callback} type="card">
            <TabPane tab="Achievements" key="1">
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
            </TabPane>

            {/* Tab 2: skills  */}
            <TabPane tab="Skills" key="2">
              {this.state.profile.keySkills &&
                this.state.profile.keySkills.map((tag, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={this.saveEditInputRef}
                        key={tag}
                        size={40}
                        className="tag-input"
                        value={editInputValue}
                        onChange={this.handleEditInputChange}
                        onBlur={() => this.handleEditInputConfirm("keySkills")}
                        onPressEnter={() =>
                          this.handleEditInputConfirm("keySkills")
                        }
                      />
                    );
                  }

                  const isLongTag = tag.length > 40;

                  const tagElem = (
                    <Tag
                      className="edit-tag"
                      key={tag}
                      closable={
                        index !== 0 &&
                        this.state.isMyProfile &&
                        this.state.canEdit
                      }
                      onClose={() => this.handleCloseTag("keySkills", tag)}
                    >
                      <span
                        onDoubleClick={
                          this.state.isMyProfile &&
                          this.state.canEdit &&
                          ((e) => {
                            this.setState(
                              { editInputIndex: index, editInputValue: tag },
                              () => {
                                this.editInput.focus();
                              }
                            );
                            e.preventDefault();
                          })
                        }
                      >
                        {isLongTag ? `${tag.slice(0, 40)}...` : tag}
                      </span>
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={() => this.handleInputConfirm("keySkills")}
                  onPressEnter={() => this.handleInputConfirm("keySkills")}
                />
              )}
              {!inputVisible && this.state.isMyProfile && this.state.canEdit && (
                <Tag className="site-tag-plus" onClick={this.showInput}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </TabPane>
            <TabPane tab="Projects" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Certificates" key="4"></TabPane>
            <TabPane tab="Contact Details" key="5">
              Content of Tab Pane 5
            </TabPane>
          </Tabs>
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

export default connect(mapStateToProps, {})(Profile3);
