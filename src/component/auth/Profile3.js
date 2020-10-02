import React, { Component } from "react";
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
    tags: ["Unremovable", "Tag 2", "Tag 3"],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
    loading: false,
    pfpVisible: true,
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

  getElements(lst, property) {
    if (lst) {
      return lst.map((item, index) => (
        <Paragraph
          className="psize"
          editable={{
            onChange: (e) => this.setEditableStrArr(property, index, e),
          }}
        >
          {item}
        </Paragraph>
      ));
    }
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
  };

  // dynamic tag methods (delete, add, edit)
  handleCloseTag = (str, removedTag) => {
    const field = this.state.profile[str].filter((tag) => tag !== removedTag);
    var profile = this.state.profile;
    profile[str] = field;
    this.setState({ profile });
  };

  handleDeleteEntry = (str, removed) => {
    const field = this.state.profile[str].filter((item) => item !== removed);
    var profile = this.state.profile;
    profile[str] = field;
    this.setState({ profile });
    this.setState({ inputVisible: false });
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
      tags,
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

    return (
      <div clasName="container-fluid mx-4">
        {/* row contains: name, curr job */}

        <Row className=" mt-4 ml-5">
          <h2>
            {ProfileData.getName(this.state.profile)}
            {", "}
            <small>[get job from db]</small>
          </h2>
        </Row>
        {/* row contains: pfp, about me, social media icons */}
        <Row justify="space-around" gutter={24} className="mx-5">
          <Col
            flex="200px"
            onMouseEnter={() => this.onEnterPFP()}
            onMouseLeave={() => this.onLeavePFP()}
          >
            {" "}
            {pfpVisible ? pfp : uploadButton}
          </Col>
          <Col xs={4} sm={6} md={10} lg={14} xl={16}>
            <h4>A little bit about me...</h4>
            <Paragraph
              editable={{
                onChange: (str) => this.setEditableStr("about", str),
                autoSize: { minRows: 1, maxRows: 5 },
              }}
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
                      <Input
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
                    <Paragraph key={item}>
                      <span
                        onDoubleClick={(e) => {
                          this.setState(
                            { editInputIndex: index, editInputValue: item },
                            () => {
                              this.editInput.focus();
                            }
                          );
                          e.preventDefault();
                        }}
                      >
                        {item}
                      </span>
                    </Paragraph>
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
              {!inputVisible && (
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

                  const isLongTag = tag.length > 20;

                  const tagElem = (
                    <Tag
                      className="edit-tag"
                      key={tag}
                      closable={index !== 0}
                      onClose={() => this.handleCloseTag("keySkills", tag)}
                    >
                      <span
                        onDoubleClick={(e) => {
                          this.setState(
                            { editInputIndex: index, editInputValue: tag },
                            () => {
                              this.editInput.focus();
                            }
                          );
                          e.preventDefault();
                        }}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
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
              {!inputVisible && (
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

export default Profile3;
