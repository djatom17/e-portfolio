import React, { Component } from "react";

import { connect } from "react-redux";
import * as ProfileData from "../../api/ProfileData";
import ProfilePicture from "../profileDisplays/ProfilePicture";
import "react-web-tabs/dist/react-web-tabs.css";
import {
  Row,
  Col,
  Descriptions,
  Badge,
  Input,
  Button,
  Tag,
  Avatar,
  Tooltip,
  Anchor,
  Carousel,
} from "antd";
import { DeleteOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EditButton from "../profileDisplays/EditButton";
import EducationManager from "../profileDisplays/EducationManager";
import CareerManager from "../profileDisplays/CareerManager";
import CareerManagerSmall from "../profileDisplays/CareerManagerSmall";
import EducationManagerSmall from "../profileDisplays/EducationManagerSmall";
import SkillManager from "../profileDisplays/SkillManager";
import AchievementManager from "../profileDisplays/AchievementManager";
import ContactDetails from "../profileDisplays/ContactDetails";

const { Title, Paragraph } = Typography;
const { Link } = Anchor;
class Profile extends Component {
  state = {
    profile: {},
    profileChanges: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
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
    this.themeCustom = ProfileData.themeCustom.bind(this);
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
    this.props.isAuthenticated &&
    this.props.profile.userid &&
    this.props.user._id &&
    this.props.user._id.valueOf() === this.props.profile.userid.valueOf()
      ? this.setState({ isMyProfile: true })
      : this.setState({ isMyProfile: false });
  };

  handleCloseTag = (fieldName, removedTag) => {
    const field = this.state.profile[fieldName].filter(
      (tag) => tag !== removedTag
    );
    let { profile, profileChanges } = this.state;
    profile[fieldName] = field;
    profileChanges[fieldName] = field;
    this.setState({
      profile,
      profileChanges,
      editInputIndex: -1,
      editInputValue: "",
    });
  };

  handleEditInputConfirm = (fieldName) => {
    this.setState(({ profile, editInputIndex, editInputValue }) => {
      var newTags = [...profile[fieldName]];
      newTags[editInputIndex] = editInputValue;
      var addChange = {};
      addChange[fieldName] = newTags;

      return {
        profile: { ...this.state.profile, ...addChange },
        profileChanges: { ...this.state.profileChanges, ...addChange },
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  deleteButt = (item) => {
    return (
      <Button
        type="link"
        onClick={() => this.handleCloseTag("achievements", item)}
      >
        <DeleteOutlined />
      </Button>
    );
  };

  render() {
    // Adjustment setting box
    const contentStyle = {
      height: "480px",
      color: "#fff",
      lineHeight: "480px",
      textAlign: "center",
      background: "#364d79",
    };

    const { Header, Content, Footer } = Layout;

    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (
      <Row style={{ backgroundColor: this.state.profile.secondaryColour }}>
        <React.Fragment>
          <CssBaseline />
          <React.Fragment>
            <CssBaseline />
            <Container fixed>
              <Typography
                component="div"
                style={{
                  backgroundColor: this.state.profile.primaryColour,
                  height: "auto",
                }}
              >
                <Content style={{ padding: "0 50px" }}>
                  <h2></h2>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Browse</Breadcrumb.Item>
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    <Breadcrumb.Item>
                      {ProfileData.getName(this.state.profile)}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Row justify="center">
                    <Col span={18} push={5}>
                      <h1></h1>
                    </Col>
                    <div>
                      <div
                          style={{
                            height: this.state.mobileView ? "30%" : "40%",
                            width: this.state.mobileView ? "20%" : "40%",
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
                    </div>
                    <Col>
                      <h1>{ProfileData.getName(this.state.profile)}</h1>
                      <row
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
                      </row>
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
                    </Col>
                  </Row>
                  <h2></h2>
                  <Descriptions title="About me" bordered>
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
                  </Descriptions>

                  <h2></h2>
                  <Descriptions title="Specialty and Skills" bordered>
                    <Descriptions.Item label="Specialty">
                      <row
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
                      </row>
                    </Descriptions.Item>

                    <Descriptions.Item label="Skills" span={2}>
                      {/*{ProfileData.getElements(this.state.profile.keySkills)}*/}
                      <SkillManager
                          isMyProfile={this.state.isMyProfile}
                          canEdit={this.state.canEdit}
                          data={this.state.profile.keySkills}
                          changeList={this.changeList}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                  <h2></h2>
                  <Descriptions title="Career Card" bordered>
                    <Descriptions.Item label="Education">
                      <EducationManagerSmall
                        isMyProfile={this.state.isMyProfile}
                        canEdit={this.state.canEdit}
                        data={this.state.profile.education}
                        changeList={this.changeList}
                        themeCol={this.props.profile.primaryColour}
                        mobileView={this.state.mobileView}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label="Job Experience">
                      <CareerManagerSmall
                        isMyProfile={this.state.isMyProfile}
                        canEdit={this.state.canEdit}
                        data={this.state.profile.workHistory}
                        changeList={this.changeList}
                        themeCol={this.props.profile.primaryColour}
                        mobileView={this.state.mobileView}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                  <h2></h2>
                  <Descriptions title="Life time Achievements"  classname="h1size" bordered>
                    <Descriptions.Item>
                      <AchievementManager
                          isMyProfile={this.state.isMyProfile}
                          canEdit={this.state.canEdit}
                          data={this.state.profile.achievements}
                          changeList={this.changeList}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions title="Projects" bordered></Descriptions>
                  <h2></h2>
                  <Descriptions title="Contacts" bordered>
                    {this.state.profile && this.state.profile.contact && (
                        <ContactDetails
                            canEdit={this.state.canEdit}
                            data={this.state.profile.contact}
                            changeObj={this.setEditablefieldName}
                        />
                    )}
                  </Descriptions>
                </Content>
              </Typography>
            </Container>
          </React.Fragment>
        </React.Fragment>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
