import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import Settings from "../profileDisplays/Settings";
import DragUpload from "../profileDisplays/DragUpload";
import EditButton from "../profileDisplays/EditButton";
import AchievementManager from "../profileDisplays/AchievementManager";
import SocialManager from "../profileDisplays/SocialManager";
import SkillManager from "../profileDisplays/SkillManager";
import ProjectManager from "../profileDisplays/ProjectManager";
import EducationManager from "../profileDisplays/EducationManager";
import CareerManager from "../profileDisplays/CareerManager";
import { Row, Col, Menu, Typography, Button } from "antd";
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
    loading: false,
    settingsLoading: false,
    visible: false,
    layout: "0",
    settingsVisible: false,
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
    mobileView: false,
    textColour: "black",
  };

  constructor() {
    super();
    this.setEditablefieldName = ProfileData.setEditableStr.bind(this);
    this.setEditablefieldNameArr = ProfileData.setEditableStrArr.bind(this);
    this.setEditableStr = ProfileData.setEditableStr.bind(this);
    this.setEditableStrArr = ProfileData.setEditableStrArr.bind(this);
    this.getElementsNew = ProfileData.getElementsNew.bind(this);
    this.showModal = ProfileData.showModal.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
    this.themeCustom = ProfileData.themeCustom.bind(this);
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    this.setState({
      textColour:
        this.props.profile.secondaryColour === "#e5e5e5" ? "black" : "white",
    });
    //Size check.
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.setState({
      layout: this.props.profile.layout,
      settingsVisible: this.props.settingsCancel,
    });
    //Auth check
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
    this.setState({ tabdisp: e.key });
  };

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
          <div>
            <Title className="h1size">Work Time Zone</Title>
            <Paragraph
              className="psize"
              editable={
                this.state.isMyProfile && this.state.canEdit
                  ? {
                      onChange: (e) => this.setEditableStr("timezone", e),
                    }
                  : false
              }
            >
              {this.state.profile.timezone}
            </Paragraph>
          </div>
          <Title className="h1size">Certificates</Title>
          <div>
            {this.state.isMyProfile && this.state.canEdit ? (
              <DragUpload
                onChange={ProfileData.onCertificatesChange.bind(this)}
                isCert={true}
              />
            ) : null}
          </div>
          <div>
            <ProjectManager
              isMyProfile={this.state.isMyProfile}
              canEdit={this.state.canEdit}
              data={this.state.profile.certificates}
              changeList={this.changeList}
              themeCol={this.props.profile.primaryColour}
              type="certificates"
            />
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "skills") {
      return (
        <div>
          <Title className="h1size">Key Skills</Title>
          <SkillManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.keySkills}
            changeList={this.changeList}
          />
          <Title className="h1size">Speciality</Title>
          <Paragraph
            className="psize"
            editable={
              this.state.isMyProfile && this.state.canEdit
                ? {
                    onChange: (e) => this.setEditableStr("specialty", e),
                  }
                : false
            }
          >
            {this.state.profile.specialty}
          </Paragraph>
          <Title className="h1size">Achievements</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
        </div>
      );
    } else if (this.state.tabdisp === "experience") {
      return (
        <div className="mb-3">
          <Title className="h1size">Education</Title>
          <EducationManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.education}
            changeList={this.changeList}
            themeCol={this.props.profile.primaryColour}
          />
          <Title className="h1size">Work Experience</Title>
          <CareerManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.workHistory}
            changeList={this.changeList}
            themeCol={this.props.profile.primaryColour}
          />
          <Title className="h1size">Projects</Title>
          <div>
            {this.state.isMyProfile && this.state.canEdit ? (
              <DragUpload
                onChange={ProfileData.onProjectsChange.bind(this)}
                isCert={false}
              />
            ) : null}
          </div>
          <ProjectManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.filesAndDocs}
            changeList={this.changeList}
            themeCol={this.props.profile.primaryColour}
            type="filesAndDocs"
          />
        </div>
      );
    }
  };

  render() {
    const { current } = this.state.tabdisp;
    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: this.state.profile.primaryColour,
        }}
      >
        <Row className="prof5height ml-n3">
          <Col flex={1}>
            <div
              className="prof5"
              style={{ backgroundColor: this.state.profile.secondaryColour }}
            >
              <div className="container-fluid prof5-img">
                <ProfilePicture
                  image={this.state.profile.image}
                  isMyProfile={this.state.isMyProfile}
                  canEdit={this.state.canEdit}
                  onPFPChange={ProfileData.handlePFPChange.bind(this)}
                />
              </div>
              <div className="prof5-img">
                <Title
                  className=" text-center h1size"
                  style={{ color: this.state.textColour }}
                >
                  {" "}
                  {ProfileData.getName(this.state.profile)}
                </Title>
                <Paragraph
                  className={"text-center"}
                  style={{ color: this.state.textColour }}
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
                {/* If layout messed up, its this mt */}
                <Row justify="center" className="mt-n3">
                  {this.state.profile && this.state.profile.social && (
                    <SocialManager
                      isMyProfile={this.state.isMyProfile}
                      canEdit={this.state.canEdit}
                      textColour={
                        this.props.profile.secondaryColour === "#e5e5e5"
                          ? "black"
                          : "white"
                      }
                      data={this.state.profile.social}
                      changeObj={ProfileData.setNestedEditableObject.bind(this)}
                    />
                  )}
                </Row>
              </div>
              <div>
                <Menu
                  onClick={this.handleTabClick}
                  selectedKeys={[current]}
                  mode="vertical"
                  style={{
                    backgroundColor: this.state.profile.secondaryColour,
                    border: "transparent",
                    color: this.state.textColour,
                  }}
                  className="text-center"
                >
                  <Menu.Item key="about" className="modified-item">
                    Personal Info
                  </Menu.Item>
                  <Menu.Item key="skills" className="modified-item">
                    Skills
                  </Menu.Item>
                  <Menu.Item key="experience" className="modified-item">
                    Experience
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
              <Col> {this.displayProfileSeg()}</Col>
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
