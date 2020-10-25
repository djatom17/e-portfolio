import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
import Settings from "../profileDisplays/Settings";
import EditButton from "../profileDisplays/EditButton";
import * as ProfileData from "../../api/ProfileData";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
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

const { Title, Paragraph } = Typography;
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
    this.handleOk = ProfileData.handleOk.bind(this);
    this.handleCancel = ProfileData.handleCancel.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
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

    const { Panel } = Collapse;


    // function callback(key) {
    //   console.log(key);
    // }

    return (
      <Col>
        <Row justify="center">
          <img
            id="Top"
            src={this.state.profile.image}
            aria-hidden
            alt="description of image"
            className="prof2-img"
          />
        </Row>
        <Row className="mx-4">
          <div>
            <Anchor
              className="prof2-anchor-overlay"
              style={{ background: "transparent" }}
            >
              <Link href="#Top" title="Profile" />
              <Link href="#About" title="About Me" />
              <Link href="#Skills" title="Key Skills" />
              <Link href="#Achievements" title="Achievements" />
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
          </div>
        </Row>
        <Row justify="center">
          <Col span={19}>
            <div className="text-center">
              <Title className=" h1size ">
                {ProfileData.getName(this.state.profile)}
              </Title>
              <Paragraph className="psize mt-n2">
                {this.state.profile.subtitle}
              </Paragraph>
            </div>
            <Typography
              component="div"
              style={{ backgroundColor: "#ffffff", height: "auto" }}
            >
              <Row className="mt-3 mx-4">
                <Divider id="About" className="h9size" orientation="left">
                  About Me
                </Divider>
                <Paragraph
                  className="psize"
                  editable={
                    this.state.isMyProfile && this.state.canEdit
                      ? {
                          onChange: (e) => this.setEditableStr("about", e),
                        }
                      : false
                  }
                >
                  <Row className="my-3 mx-4">
                    {this.state.profile.about}
                  </Row>
                </Paragraph>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider
                    id="Education"
                    className="h9size"
                    orientation="left"
                >
                  Education
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <AchievementManager
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-3 mx-4">
                <Divider id="Key Skills" className="h9size" orientation="left">
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
                <Divider id="Key Skills" className="h9size" orientation="left">
                  Areas of Speciality
                </Divider>
                <Row className="my-3 mx-4">
                </Row>
              </Row>

              <Row className="mt-3 mx-4">
                <Divider
                    id="JobExperience"
                    className="h9size"
                    orientation="left"
                >
                  Job Experience
                </Divider>
                <Row className="mt-3 mx-4">
                  <Col>
                    <AchievementManager
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
