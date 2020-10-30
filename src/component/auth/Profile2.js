import React, { Component } from "react";
import { connect } from "react-redux";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
import EducationManager from "../profileDisplays/EducationManager";
import SocialManager from "../profileDisplays/SocialManager";
import CareerManager from "../profileDisplays/CareerManager";
import EditButton from "../profileDisplays/EditButton";
import * as ProfileData from "../../api/ProfileData";

import "antd/dist/antd.css";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Tag,
  Tooltip,
  Anchor,
  Divider,
  Collapse,
} from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

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
          <Link href="#Skills" title="Key Skills" />
          <Link href="#Education" title="Education" />
          <Link href="#WorkExperience" title="Experience" />
          <div>
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
          </div>
        </Anchor>
        <Row>
          <img
            id="Top"
            src={this.state.profile.image}
            aria-hidden
            alt="description of image"
            style={{
              height: this.state.mobileView ? "40%" : "70%",
              width: this.state.mobileView ? "40%" : "70%",
              marginTop: this.state.mobileView ? "5%" : "0%",
              marginInlineStart: this.state.mobileView ? "30%" : "15%",
            }}
          />
        </Row>
        <Row className="mx-4">
          <div></div>
        </Row>
        <Row justify="center">
          <Col span={19}>
            <div className="text-center">
              <Title className=" h1size ">
                {ProfileData.getName(this.state.profile)}
              </Title>
              <Paragraph className="psize mt-n3">
                {this.state.profile.subtitle}
              </Paragraph>
              <Row justify="center" className="mt-n4">
                <SocialManager
                  isMyProfile={this.state.isMyProfile}
                  canEdit={this.state.canEdit}
                  textColour="black"
                />
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
