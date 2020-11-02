import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ProfilePicture from "../profileDisplays/ProfilePicture";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
import EducationManager from "../profileDisplays/EducationManager";
import SocialManager from "../profileDisplays/SocialManager";
import CareerManager from "../profileDisplays/CareerManager";
import ProjectManager from "../profileDisplays/ProjectManager";
import EditButton from "../profileDisplays/EditButton";
import DragUpload from "../profileDisplays/DragUpload";
import * as ProfileData from "../../api/ProfileData";

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
  Tooltip,
  Anchor,
  Collapse,
  breadcrumb,
  Divider,
} from "antd";

import {
  InboxOutlined,
  UserOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Paragraph, Title } = Typography;
const { Link } = Anchor;
class Profile2 extends Component {
  state = {
    profile: {},
    profileChanges: {},
    canEdit: false,
    isMyProfile: false,
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
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    // size check
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  };

  render() {
    // const { Panel } = Collapse;
    // function callback(key) {
    //   console.log(key);
    // }

    return (
      <Col style={{ backgroundColor: this.state.profile.secondaryColour }}>
        <Anchor
          className="prof2-anchor-overlay"
          style={{ background: "transparent" }}
        >
          <Link href="#Top" title="Profile" />
          <Link href="#About" title="About Me" />
          <Link href="#Specialty" title="Specialty" />
          <Link href="#Skills" title="Key Skills" />
          <Link href="#Education" title="Education" />
          <Link href="#WorkExperience" title="Experience" />
          <Link href="#Achievements" title="Achievements" />
          <Link href="#Projects" title="Projects" />
          <Link href="#Certificates" title="Certificates" />
          <Link href="#Contact" title="Contact" />
          <div>
            {this.state.isMyProfile ? (
              <EditButton
                _id={this.state.profile._id}
                profileChanges={this.state.profileChanges}
                token={this.props.token}
                isMyProfile={this.state.isMyProfile}
                canEdit={this.state.canEdit}
                color="black"
                changeEdit={() =>
                  this.setState({
                    canEdit: !this.state.canEdit,
                    profileChanges: {},
                  })
                }
              />
            ) : null}
          </div>
        </Anchor>
        <Row>
          <div
            style={{
              height: this.state.mobileView ? "40%" : "70%",
              width: this.state.mobileView ? "40%" : "70%",
              marginTop: this.state.mobileView ? "5%" : "0%",
              marginInlineStart: this.state.mobileView ? "30%" : "15%",
            }}
          >
            <ProfilePicture
              image={this.state.profile.image}
              isMyProfile={this.state.isMyProfile}
              canEdit={this.state.canEdit}
              onPFPChange={ProfileData.handlePFPChange.bind(this)}
            />
          </div>
        </Row>

        <Row justify="center">
          <Col span={19}>
            <div className="text-center">
              <Title className=" h1size ">
                {ProfileData.getName(this.state.profile)}
              </Title>
              {/* <Paragraph className="psize mt-n3">
                {this.state.profile.subtitle}
              </Paragraph> */}
              <Paragraph
                className="psize mt-n3"
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

              <Row justify="center" className="mt-n4">
                {this.state.profile && this.state.profile.social && (
                  <SocialManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    textColour="black"
                    data={this.state.profile.social}
                    changeObj={this.setEditableStr}
                  />
                )}
              </Row>
            </div>
            <Typography
              component="div"
              style={{
                backgroundColor: this.state.profile.primaryColour,
                marginInlineStart: this.state.mobileView ? "20%" : "0%",
                height: "auto",
              }}
            >
              <Row className="mt-3 mx-4">
                <Divider id="About" className="h9size" orientation="left">
                  About Me
                </Divider>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Specialty" className="h9size" orientation="left">
                  Areas of Speciality
                </Divider>
                <Row>
                  <Col>
                    <Paragraph
                      className="psize"
                      editable={
                        this.state.isMyProfile && this.state.canEdit
                          ? {
                              onChange: (e) =>
                                this.setEditableStr("specialty", e),
                              autoSize: { minRows: 1, maxRows: 5 },
                            }
                          : false
                      }
                    >
                      {this.state.profile.specialty}
                    </Paragraph>
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Time zone" className="h9size" orientation="left">
                  Work Time Zone
                </Divider>
                <Row className="my-3 mx-4">
                  <Paragraph
                    className="psize"
                    ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                    editable={
                      this.state.canEdit
                        ? {
                            onChange: (fieldName) =>
                              this.setEditablefieldName("timezone", fieldName),
                            autoSize: { minRows: 1, maxRows: 5 },
                          }
                        : false
                    }
                  >
                    {this.state.profile.timezone}
                  </Paragraph>
                </Row>
              </Row>

              <Row className="mt-3 mx-4">
                <Divider id="Skills" className="h9size" orientation="left">
                  Key Skills
                </Divider>
                <Row className="my-3 mx-4">
                  <SkillManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    data={this.state.profile.keySkills}
                    changeList={this.changeList}
                  />
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Education" className="h9size" orientation="left">
                  Education
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <EducationManager
                      isMyProfile={this.state.isMyProfile}
                      canEdit={this.state.canEdit}
                      data={this.state.profile.education}
                      changeList={this.changeList}
                      themeCol={this.props.profile.primaryColour}
                      mobileView={this.state.mobileView}
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider
                  id="WorkExperience"
                  className="h9size"
                  orientation="left"
                >
                  Work Experience
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <CareerManager
                      isMyProfile={this.state.isMyProfile}
                      canEdit={this.state.canEdit}
                      data={this.state.profile.workHistory}
                      changeList={this.changeList}
                      themeCol={this.props.profile.primaryColour}
                      mobileView={this.state.mobileView}
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider
                  id="Achievements"
                  className="h9size"
                  orientation="left"
                >
                  Achievements
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <AchievementManager
                      isMyProfile={this.state.isMyProfile}
                      canEdit={this.state.canEdit}
                      data={this.state.profile.achievements}
                      changeList={this.changeList}
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Projects" className="h9size" orientation="left">
                  Projects
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
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
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider
                  id="Certificates"
                  className="h9size"
                  orientation="left"
                >
                  Certificates
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <div>
                      {this.state.isMyProfile && this.state.canEdit ? (
                        <DragUpload
                          onChange={ProfileData.onCertificatesChange.bind(this)}
                          isCert={true}
                        />
                      ) : null}
                    </div>
                    <ProjectManager
                      isMyProfile={this.state.isMyProfile}
                      canEdit={this.state.canEdit}
                      data={this.state.profile.certificates}
                      changeList={this.changeList}
                      themeCol={this.props.profile.primaryColour}
                      type="certificates"
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Contact" className="h9size" orientation="left">
                  Contact Information
                </Divider>
                {/* <Row className="mt-3 mx-4">
                  <Col>
                    {ProfileData.getElements(this.state.profile.social)}
                  </Col>
                </Row> */}
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="TimeZone" className="h9size" orientation="left">
                  Time Zone
                </Divider>
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
              </Row>
            </Typography>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile2);
