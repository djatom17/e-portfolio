import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
// import Settings from "../profileDisplays/Settings";
import DragUpload from "../profileDisplays/DragUpload";
import EditButton from "../profileDisplays/EditButton";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
import { Row, Col, Menu, Typography, Avatar, Input, Button, Tag } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import ProfilePicture from "../profileDisplays/ProfilePicture";

const { Title, Paragraph } = Typography;

class Profile5 extends Component {
  state = {
    profile: {},
    profileChanges: {},
    tabdisp: "about",
    canEdit: false,
    isMyProfile: false,
    // loading: false,
    // visible: false,
    // layout: "0",
    // settingsVisible: false,
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
    mobileView: false,
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
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    //Size check.
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    //Authorisation check.
    // this.setState({
    //   layout: this.props.profile.layout,
    //   visible: this.props.settingsVisible,
    // });
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
    // {
    //   () => this.props.settingsCallback(profile._id, this.props.token);
    // }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  // Tab click event handler
  handleTabClick = (e) => {
    console.log("click ", e);
    this.setState({ tabdisp: e.key });
  };

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
              ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
            >
              {this.state.profile.about}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "achievements") {
      return (
        <AchievementManager
          isMyProfile={this.state.isMyProfile}
          canEdit={this.state.canEdit}
          data={this.state.profile.achievements}
          changeList={this.changeList}
        />
      );
    } else if (this.state.tabdisp === "skills") {
      return (
        <SkillManager
          isMyProfile={this.state.isMyProfile}
          canEdit={this.state.canEdit}
          data={this.state.profile.keySkills}
          changeList={this.changeList}
        />
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
      <div className="container-fluid ml-n3 mb-3">
        <Row className="prof5height">
          <Col flex={1}>
            <div className="prof5">
              <div className="container-fluid prof5-img">
                <ProfilePicture
                  image={this.state.profile.image}
                  isMyProfile={this.state.isMyProfile}
                  canEdit={this.state.canEdit}
                  mobileView={this.state.mobileView}
                />
              </div>
              <div className="prof5-img">
                <Title className=" text-center h1size">
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
                  style={{
                    backgroundColor: "coral",
                    border: "transparent",
                  }}
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
            <div className="prof5-utility-buttons ">
              {this.state.isMyProfile ? (
                <Row className="mt-3" justify="end" gutter={8}>
                  <Col>
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
                  </Col>
                </Row>
              ) : null}
            </div>
            <Row className="mt-3">
              <Col>
                {" "}
                {this.displayProfileSeg()}
                {/* {this.state.isMyProfile ? (
                  <Settings
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    showModal={this.showModal}
                    layout={this.state.layout}
                    visible={this.state.visible}
                    loading={this.state.loading}
                  />
                ) : null} */}
              </Col>
            </Row>
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
