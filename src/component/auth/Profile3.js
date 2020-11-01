import React, { Component } from "react";
import { connect } from "react-redux";
import ProfilePicture from "../profileDisplays/ProfilePicture";
import AchievementManager from "../profileDisplays/AchievementManager";
import CareerManager from "../profileDisplays/CareerManager";
import SkillManager from "../profileDisplays/SkillManager";
import SocialManager from "../profileDisplays/SocialManager";
import EducationManager from "../profileDisplays/EducationManager";
import EditButton from "../profileDisplays/EditButton";
import DragUpload from "../profileDisplays/DragUpload";
import * as ProfileData from "../../api/ProfileData";
import { Row, Col, Typography, Button, Divider, Tabs } from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// function for tabs
function callback(key) {
  console.log(key);
}

class Profile3 extends Component {
  state = {
    profile: {},
    profileChanges: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
    // loading: false,
    pfpVisible: true,
    canEdit: false,
    isMyProfile: false,
    mobileView: false,
    originalImage: "",
  };

  constructor() {
    super();
    this.setEditablefieldName = ProfileData.setEditableStr.bind(this);
    this.setEditablefieldNameArr = ProfileData.setEditableStrArr.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
    this.themeCustom = ProfileData.themeCustom.bind(this);
  }

  componentDidMount() {
    this.setState({
      profile: this.props.profile,
      originalImage: this.props.profile.image,
    });
    //Size check.
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    //Authorisation check.
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  render() {
    // whether the app is in mobile view
    const { mobileView } = this.state;

    // desktop version of the profile header
    const desktopHeader = (
      <div>
        <Row className="pt-4 mt-4 ml-5" justify="space-between">
          <Col>
            <h2>
              {ProfileData.getName(this.state.profile)}

              <small>
                {", "}
                {this.state.profile.workHistory &&
                this.state.profile.workHistory[0]
                  ? this.state.profile.workHistory[0].role +
                    " - " +
                    this.state.profile.workHistory[0].workplace
                  : null}
              </small>
            </h2>
          </Col>
          <Col className="mr-5">
            {this.state.isMyProfile ? (
              <Row className="mt-3" gutter={8}>
                <Col>
                  <EditButton
                    _id={this.state.profile._id}
                    profileChanges={this.state.profileChanges}
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
          </Col>
        </Row>
        <Row justify="space-around" gutter={24} className="mx-5">
          {" "}
          <ProfilePicture
            image={this.state.profile.image}
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            onPFPChange={ProfileData.handlePFPChange.bind(this)}
          />
          <Col xs={4} sm={6} md={10} lg={14} xl={16}>
            <h4>A little bit about me...</h4>
            <Paragraph
              ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
              editable={
                this.state.canEdit
                  ? {
                      onChange: (fieldName) =>
                        this.setEditablefieldName("about", fieldName),
                      autoSize: { minRows: 1, maxRows: 5 },
                    }
                  : false
              }
            >
              {this.state.profile.about}
            </Paragraph>

            {this.state.profile && this.state.profile.social && (
              <SocialManager
                isMyProfile={this.state.isMyProfile}
                canEdit={this.state.canEdit}
                data={this.state.profile.social}
                changeObj={this.setEditablefieldName}
              />
            )}
          </Col>
        </Row>
      </div>
    );

    // mobile version of the profile header
    const mobileHeader = (
      <div>
        <Row>
          <Col className="mr-5">
            {this.state.isMyProfile ? (
              <Row className="ml-3 mt-3" gutter={8}>
                <Col>
                  <EditButton
                    _id={this.state.profile._id}
                    profileChanges={this.state.profileChanges}
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
          </Col>
        </Row>
        <Row className="ml-3 ">
          <Col>
            <h2>
              {ProfileData.getName(this.state.profile)}
              {", "}
              <small>[get job from db]</small>
            </h2>
          </Col>
        </Row>
        <Row justify="center">
          <ProfilePicture
            image={this.state.profile.image}
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            onPFPChange={ProfileData.handlePFPChange.bind(this)}
          />
        </Row>
        <Row justify="center">
          {this.state.profile && this.state.profile.social && (
            <SocialManager
              isMyProfile={this.state.isMyProfile}
              canEdit={this.state.canEdit}
              data={this.state.profile.social}
              changeObj={this.setEditablefieldName}
            />
          )}
        </Row>

        <Row className="mx-3 mt-2">
          <Paragraph
            ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
            editable={
              this.state.canEdit
                ? {
                    onChange: (fieldName) =>
                      this.setEditablefieldName("about", fieldName),
                    autoSize: { minRows: 1, maxRows: 5 },
                  }
                : false
            }
          >
            {this.state.profile.about}
          </Paragraph>
        </Row>
      </div>
    );

    return (
      <Row
        style={{
          background: this.state.profile.secondaryColour,
          minHeight: "90vh",
        }}
      >
        <Col span={20} push={2}>
          <Typography
            component="div"
            style={{
              backgroundColor: this.state.profile.primaryColour,
              height: "auto",
            }}
          >
            {!mobileView ? desktopHeader : mobileHeader}
            <Divider />
            <Row className=" my-4 ml-5">
              <Tabs onChange={callback} type="card">
                <TabPane tab="Achievements" key="1">
                  <Title className="h1size">Achievements</Title>
                  <AchievementManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    changeList={this.changeList}
                    data={this.state.profile.achievements}
                  />
                </TabPane>

                {/* Tab 2: skills  */}
                <TabPane tab="Skills" key="2">
                  <Title className="h1size">Key Skills</Title>
                  <SkillManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    data={this.state.profile.keySkills}
                    changeList={this.changeList}
                  />
                </TabPane>
                <TabPane tab="Education" key="5">
                  <Title>Education</Title>
                  <EducationManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    data={this.state.profile.education}
                    changeList={this.changeList}
                    themeCol={this.props.profile.primaryColour}
                  />
                </TabPane>
                <TabPane tab="Career" key="3" className="mb-3">
                  <Title className="h1size">Experience</Title>
                  <CareerManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                    data={this.state.profile.workHistory}
                    changeList={this.changeList}
                    themeCol={this.props.profile.primaryColour}
                  />
                </TabPane>
                <TabPane tab="Projects" key="4">
                  <Typography.Title>Projects</Typography.Title>
                  {this.state.isMyProfile && this.state.canEdit ? (
                    <DragUpload
                      onChange={ProfileData.onFileListChange.bind(this)}
                    />
                  ) : null}
                  {ProfileData.getFiles(this.state.profile.filesAndDocs)}
                </TabPane>
                <TabPane tab="Certificates" key="5">
                  {/* <Typography.Title>Education</Typography.Title>
                  {ProfileData.getElements(this.state.profile.education)} */}
                </TabPane>
                <TabPane tab="Contact Details" key="6">
                  <Typography.Title>Time zone</Typography.Title>
                  <Paragraph
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
                  <Typography.Title>Contact Details</Typography.Title>
                  {/* {ProfileData.getElements(this.state.profile.social)} */}
                </TabPane>
              </Tabs>
            </Row>
          </Typography>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile3);
