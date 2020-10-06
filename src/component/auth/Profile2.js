import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
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
  Anchor,
} from "antd";
import {
  InboxOutlined,
  UserOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Link } = Anchor;
class Profile2 extends Component {
  state = {
    profile: {},
    profileChanges: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
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

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
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

  render() {
    // for tags
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;

    return (
      <Col>
        <Row>
          <img
            id="Top"
            src={this.state.profile.image}
            aria-hidden
            alt="description of image"
            className="prof2-img"
          />
          <div className=" size prof2-text-overlay text-center">
            <p className=" h1 "> {ProfileData.getName(this.state.profile)}</p>
            <p className="psize ">{this.state.profile.subtitle}</p>
            <p className="psize "> Work at home in my penthouse </p>
          </div>
        </Row>
        <Row className="mx-4">
          <div>
            <Anchor className="prof2-anchor-overlay">
              <Link href="#Top" title="Profile" />
              <Link href="#About" title="About Me" />
              <Link href="#Skills" title="Key Skills" />
              <Link href="#Achievements" title="Achievements" />
            </Anchor>
          </div>
        </Row>
        <Row className="mt-3 mx-4">
          <Title id="About" className="h1size">
            About Me
          </Title>

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
        </Row>
        <Row className="mt-3 mx-4">
          <Title id="Skills" className="h1size">
            Key Skills
          </Title>
        </Row>
        <Row className=" mx-4">
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
                  className="skills-tag"
                  key={tag}
                  closable={
                    index !== 0 && this.state.isMyProfile && this.state.canEdit
                  }
                  onClose={() => this.handleCloseTag("keySkills", tag)}
                >
                  <span
                    className="skills-span"
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
        </Row>
        <Row className="mt-3 mx-4">
          <Title id="Achievements" className="h1size">
            Achievements
          </Title>
        </Row>
        <Row className="mt-3 mx-4">
          <Col>
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
                      onBlur={() => this.handleEditInputConfirm("achievements")}
                      onPressEnter={() =>
                        this.handleEditInputConfirm("achievements")
                      }
                    />
                  );
                }
                const achievement = (
                  <Row>
                    <Col flex="auto">
                      <Paragraph className="achievements-text" key={item}>
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
          </Col>
        </Row>
      </Col>

      // <div className="profile">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-mid-8 m-auto">
      //         <h1 className="display-4 text-center">
      //           {ProfileData.getName(this.state.profile)}
      //         </h1>
      //         <p className="lead text-center">{this.state.profile.subtitle}</p>
      //         <div className="container browse-outer">
      //           <div className="container browse-profile-picture">
      //             <img
      //               src={this.state.profile.image}
      //               aria-hidden
      //               alt="description of image"
      //             />
      //           </div>
      //           <Tabs defaultTab="basic-tab-one">
      //             <TabList>
      //               <Tab tabFor="basic-tab-one">About me</Tab>
      //               <Tab tabFor="basic-tab-two">Achievements</Tab>
      //               <Tab tabFor="basic-tab-three">Skills</Tab>
      //             </TabList>
      //             <TabPanel tabId="basic-tab-one">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name ">About me</h1>
      //                 <p>{this.state.profile.about}</p>
      //               </div>
      //             </TabPanel>
      //             <TabPanel tabId="basic-tab-two">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name">Achievments</h1>
      //                 {ProfileData.getElements(this.state.profile.achievements)}
      //               </div>
      //             </TabPanel>
      //             <TabPanel tabId="basic-tab-three">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name">Skills</h1>
      //                 {ProfileData.getElements(this.state.profile.keySkills)}
      //               </div>
      //             </TabPanel>
      //           </Tabs>

      //           <div className="text-left social-media-links">
      //             <h3>Social Media Links</h3>
      //             <div>
      //               <p>{ProfileData.getElements(this.state.profile.social)}</p>
      //             </div>
      //           </div>
      //         </div>
      //         <p></p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile2);
