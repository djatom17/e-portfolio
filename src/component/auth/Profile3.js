import React, { Component } from "react";
import { connect } from "react-redux";
//import MediaQuery from "react-responsive";
import ProfilePicture from "../profileDisplays/ProfilePicture";
import AchievementManager from "../profileDisplays/AchievementManager";
import CareerManager from "../profileDisplays/CareerManager";
import SkillManager from "../profileDisplays/SkillManager";
// import Settings from "../profileDisplays/Settings";
// import SettingsButton from "../profileDisplays/SettingsButton";
import EditButton from "../profileDisplays/EditButton";
import * as ProfileData from "../../api/ProfileData";
import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Tabs,
  Upload,
  message,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
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
  };

  constructor() {
    super();
    this.setEditablefieldName = ProfileData.setEditableStr.bind(this);
    this.setEditablefieldNameArr = ProfileData.setEditableStrArr.bind(this);
    this.showModal = ProfileData.showModal.bind(this);
    this.handleOk = ProfileData.handleOk.bind(this);
    this.handleCancel = ProfileData.handleCancel.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
  }

  componentDidMount() {
    this.setState({ profile: this.props.profile });
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

  handleButtonClick = () => {
    // Make changes reflect on database
    ProfileData.updateProfile(
      this.state.profile._id,
      this.state.profileChanges,
      this.props.token
    );
    this.setState({
      canEdit: !this.state.canEdit,
      profileChanges: {},
    });
  };

  // // pfp image upload methods
  // handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (imageUrl) =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       })
  //     );
  //   }
  // };

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
              {", "}
              <small>
                {this.state.profile.workHistory
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
          </Col>
        </Row>
        <Row justify="space-around" gutter={24} className="mx-5">
          {" "}
          <ProfilePicture
            image={this.state.profile.image}
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            mobileView={false}
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
        <Row gutter={8} justify="center">
          <ProfilePicture
            image={this.state.profile.image}
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            mobileView={false}
          />
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
      <Row className="mb-4">
        <Col span={20} push={2}>
          <Typography
            component="div"
            style={{ backgroundColor: "#ffffff", height: "auto" }}
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
                <TabPane tab="Career" key="3">
                  <CareerManager
                    isMyProfile={this.state.isMyProfile}
                    canEdit={this.state.canEdit}
                  />
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Certificates" key="4">
                  <Typography.Title>Certificates</Typography.Title>
                </TabPane>

                <TabPane tab="Contact Details" key="5">
                  <Typography.Title>Contact Details</Typography.Title>
                  Content of Tab Pane 5
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
