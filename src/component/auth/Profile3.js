import React, { Component, Fragment } from "react";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
import Settings from "../profileDisplays/Settings";
import { connect } from "react-redux";
import * as ProfileData from "../../api/ProfileData";
import {
  Row,
  Col,
  Avatar,
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

const { Paragraph } = Typography;
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
    loading: false,
    pfpVisible: true,
    canEdit: false,
    isMyProfile: false,
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
  }

  componentDidMount() {
    this.setState({ profile: this.props.profile });
    //Authorisation check.
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
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
    const { pfpVisible } = this.state;

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
    const ach = (
      <Fragment>
        <AchievementManager
          isMyProfile={this.state.isMyProfile}
          canEdit={this.state.canEdit}
          changeList={this.changeList}
          data={this.state.profile.achievements}
        />
      </Fragment>
    );

    const editButt = (
      <Fragment>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          onClick={this.handleButtonClick}
          style={{ height: 50, color: "blue" }}
        >
          {this.state.canEdit ? "Done" : "Edit"}
        </button>
      </Fragment>
    );

    return (
      <div clasName="container-fluid mx-4">
        {/* row contains: name, curr job */}

        <Row className=" mt-4 ml-5" justify="space-between">
          <Col>
            <h2>
              {ProfileData.getName(this.state.profile)}
              {", "}
              <small>[get job from db]</small>
            </h2>
          </Col>
          <Col className="mr-5">
            {this.state.isMyProfile ? editButt : null}{" "}
          </Col>
        </Row>
        {/* row contains: pfp, about me, social media icons */}
        <Row justify="space-around" gutter={24} className="mx-5">
          <Col
            flex="200px"
            onMouseEnter={() => this.onEnterPFP()}
            onMouseLeave={() => this.onLeavePFP()}
          >
            {" "}
            {this.state.isMyProfile && this.state.canEdit && !pfpVisible
              ? uploadButton
              : pfp}
          </Col>
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
              {ach}
            </TabPane>

            {/* Tab 2: skills  */}
            <TabPane tab="Skills" key="2">
              <SkillManager
                isMyProfile={this.state.isMyProfile}
                canEdit={this.state.canEdit}
                data={this.state.profile.keySkills}
                changeList={this.changeList}
              />
            </TabPane>
            <TabPane tab="Projects" key="3">
              <Typography.Title>Projects</Typography.Title>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile3);
