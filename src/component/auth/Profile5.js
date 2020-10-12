import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import Settings from "./Settings";
import DragUpload from "./DragUpload";
import EditButton from "./EditButton";
import DispAchievements from "./DispAchievements";
import { Row, Col, Menu, Typography, Avatar, Input, Button, Tag } from "antd";
import {
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

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

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    //Authorisation check.
    this.setState({ layout: this.props.profile.layout });
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  };

  constructor() {
    super();
    this.setEditableStr = ProfileData.setEditableStr.bind(this);
    this.setEditableStrArr = ProfileData.setEditableStrArr.bind(this);
    this.getElementsNew = ProfileData.getElementsNew.bind(this);
    this.showModal = ProfileData.showModal.bind(this);
    this.handleOk = ProfileData.handleOk.bind(this);
    this.handleCancel = ProfileData.handleCancel.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
  }

  // Tab click event handler
  handleTabClick = (e) => {
    console.log("click ", e);
    this.setState({ tabdisp: e.key });
  };

  changeAchievement = (
    inputVisible,
    inputValue,
    editInputIndex,
    editInputValue,
    profile,
    profileChanges
  ) => {
    console.log(this.state.profile);

    this.setState({
      inputValue: inputValue,
      inputVisible: inputVisible,
      editInputIndex: editInputIndex,
      editInputValue: editInputValue,
      profile: profile,
      profileChanges: profileChanges,
    });
    console.log(this.state.profile);
  };

  // dynamic tag methods (delete, add, edit)
  // showInput = () => {
  //   this.setState({ inputVisible: true }, () => this.input.focus());
  // };

  // callBackAchieve = (editInputIndex, editInputValue) => {
  //   this.setState({
  //     editInputIndex: editInputIndex,
  //     editInputValue: editInputValue,
  //   });
  // };

  // handleInputChange = (e) => {
  //   this.setState({ inputValue: e.target.value });
  // };

  // handleEditInputChange = (e) => {
  //   this.setState({ editInputValue: e.target.value });
  // };

  // handleInputConfirm = (fieldName) => {
  //   //const { inputValue } = this.state;
  //   let { profile, inputValue, profileChanges } = this.state;

  //   // confirm if array, and item to be add is not empty
  //   // checks for duplicates, but maybe not do that here (?)
  //   if (
  //     inputValue &&
  //     profile[fieldName] &&
  //     profile[fieldName].indexOf(inputValue) === -1
  //   ) {
  //     profile[fieldName] = [...profile[fieldName], inputValue];
  //     profileChanges[fieldName] = [...profile[fieldName]];
  //   }
  //   console.log(profile[fieldName]);
  //   this.setState({
  //     profile,
  //     profileChanges,
  //     inputVisible: false,
  //     inputValue: "",
  //   });
  // };

  // handleCloseTag = (fieldName, removedTag) => {
  //   const field = this.state.profile[fieldName].filter(
  //     (tag) => tag !== removedTag
  //   );
  //   let { profile, profileChanges } = this.state;
  //   profile[fieldName] = field;
  //   profileChanges[fieldName] = field;
  //   this.setState({
  //     profile,
  //     profileChanges,
  //     editInputIndex: -1,
  //     editInputValue: "",
  //   });
  //   // this.setState({ editInputIndex: -1, editInputValue: "" });
  // };

  // handleEditInputConfirm = (fieldName) => {
  //   this.setState(({ profile, editInputIndex, editInputValue }) => {
  //     var newTags = [...profile[fieldName]];
  //     newTags[editInputIndex] = editInputValue;
  //     var addChange = {};
  //     addChange[fieldName] = newTags;

  //     return {
  //       profile: { ...this.state.profile, ...addChange },
  //       profileChanges: { ...this.state.profileChanges, ...addChange },
  //       editInputIndex: -1,
  //       editInputValue: "",
  //     };
  //   });
  // };

  // saveInputRef = (input) => {
  //   this.input = input;
  // };

  // saveEditInputRef = (input) => {
  //   this.editInput = input;
  // };

  // // delete button for achievements
  // deleteButt = (item) => {
  //   return (
  //     <Button
  //       type="link"
  //       onClick={() => this.handleCloseTag("achievements", item)}
  //     >
  //       <DeleteOutlined />
  //     </Button>
  //   );
  // };

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
      return (
        <DispAchievements
          title="Achievements"
          data={this.state.profile.achievements}
          inputVisible={this.state.inputVisible}
          inputValue={this.state.inputValue}
          isMyProfile={this.state.isMyProfile}
          canEdit={this.state.canEdit}
          editInputIndex={this.state.editInputIndex}
          editInputValue={this.state.editInputValue}
          profile={this.state.profile}
          profileChanges={this.state.profileChanges}
          changeAchievement={() => this.changeAchievement()}
        />
      );
    } else if (this.state.tabdisp === "skills") {
      return (
        <div>
          <Title className="h1size">Skills</Title>
          <div>
            <Paragraph className="psize">
              {this.getElementsNew(this.state.profile.keyackills, "keySkills")}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "projects") {
      return (
        <div>
          <Title className="h1size">Projects</Title>
          <div>
            {this.state.isMyProfile && this.state.canEdit ? (
              <DragUpload token={this.props.token} />
            ) : null}
            {console.log(this.state.isMyProfile)}
          </div>
          {this.getFiles(this.state.profile.filesAndDocs)}
        </div>
      );
    }
  };

  render() {
    const { current } = this.state.tabdisp;
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
                  onClick={this.handleTabClick}
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
          <Col>
            {this.state.isMyProfile ? (
              <EditButton
                _id={this.state.profile._id}
                profileChanges={this.state.profileChanges}
                token={this.props.token}
                isMyProfile={this.state.isMyProfile}
                canEdit={this.state.canEdit}
                changeEdit={() =>
                  this.setState({
                    canEdit: !this.state.canEdit,
                    profileChanges: {},
                  })
                }
              />
            ) : null}
          </Col>
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
