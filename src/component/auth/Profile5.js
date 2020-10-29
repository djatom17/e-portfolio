import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import Settings from "../profileDisplays/Settings";
import DragUpload from "../profileDisplays/DragUpload";
import EditButton from "../profileDisplays/EditButton";
import AchievementManager from "../profileDisplays/AchievementManager";
import SkillManager from "../profileDisplays/SkillManager";
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
    primaryColour: "",
    secondaryColour: "",
  };

  constructor() {
    super();
    this.setEditableStr = ProfileData.setEditableStr.bind(this);
    this.setEditableStrArr = ProfileData.setEditableStrArr.bind(this);
    this.getElementsNew = ProfileData.getElementsNew.bind(this);
    this.showModal = ProfileData.showModal.bind(this);
    // this.handleOk = ProfileData.settingsOk.bind(this);
    // this.handleCancel = ProfileData.settingsCancel.bind(this);
    this.changeLayout = ProfileData.changeLayout.bind(this);
    this.changeList = ProfileData.changeList.bind(this);
    this.resize = ProfileData.resize.bind(this);
    this.themeCustom = ProfileData.themeCustom.bind(this);
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
    this.setState({
      layout: this.props.profile.layout,
      settingsVisible: this.props.settingsCancel,
      primaryColour: this.props.profile.primaryColour,
      secondaryColour: this.props.profile.secondaryColour,
    });
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
          <Button
            onClick={() => {
              ProfileData.getFileDownload(item.name, item.url);
            }}
          >
            <PaperClipOutlined />
            {item.name}
          </Button>
        </div>
      ));
    }
  }
  // handlePrimColour = (color, str) => {
  //   str === "Prim"
  //     ? this.setState({ primaryColour: color.hex })
  //     : this.setState({ secondaryColour: color.hex });
  // };

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
          <Title className="h1size">Work Time Zone</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
          <Title className="h1size">Achievements</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
        </div>
      );
    } else if (this.state.tabdisp === "profession") {
      return (
        <div>
          <Title className="h1size">Key Skills</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
          <Title className="h1size">Speciality</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
          <Title className="h1size">Projects</Title>
          <div>
            {this.state.isMyProfile && this.state.canEdit ? (
              <DragUpload
                token={this.props.token}
                onChange={ProfileData.onFileListChange.bind(this)}
              />
            ) : null}
            {console.log(this.state.isMyProfile)}
          </div>
          {this.getFiles(this.state.profile.filesAndDocs)}
        </div>
      );
    } else if (this.state.tabdisp === "experience") {
      return (
        <div>
          <Title className="h1size">Education</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
          <Title className="h1size">Work Experience</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
          />
        </div>
      );
    } else if (this.state.tabdisp === "projects") {
      return (
        <div>
          <Title className="h1size">Social Media</Title>
          <AchievementManager
            isMyProfile={this.state.isMyProfile}
            canEdit={this.state.canEdit}
            data={this.state.profile.achievements}
            changeList={this.changeList}
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
          backgroundColor: this.state.secondaryColour,
        }}
      >
        <Row className="prof5height ml-n3">
          <Col flex={1}>
            <div
              className="prof5"
              style={{ backgroundColor: this.state.primaryColour }}
            >
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
                    backgroundColor: this.state.primaryColor,
                    border: "transparent",
                  }}
                  className="text-center"
                >
                  <Menu.Item key="about" className="modified-item">
                    Personal Info
                  </Menu.Item>
                  <Menu.Item key="profession" className="modified-item">
                    Profession
                  </Menu.Item>
                  <Menu.Item key="experience" className="modified-item">
                    Experience
                  </Menu.Item>
                  <Menu.Item key="projects" className="modified-item">
                    Contacts
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
                    visible={this.state.settingsVisible}
                    loading={this.state.settingsLoading}
                    themeCustom={this.themeCustom}
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
