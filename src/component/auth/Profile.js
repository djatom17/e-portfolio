import React, { Component } from "react";

import { connect } from "react-redux";
import * as ProfileData from "../../api/ProfileData";
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

// const { Title, Paragraph } = Typography;
// const { Link } = Anchor;
class Profile extends Component {
  state = {
    profile: {},
    profileChanges: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

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

    const { Content } = Layout;

    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (
      <Row style={{ backgroundColor: this.state.profile.secondaryColour }}>
        <React.Fragment>
          <CssBaseline />
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
                    <Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>Browse</Breadcrumb.Item>
                      <Breadcrumb.Item>Profile</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        {ProfileData.getName(this.state.profile)}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                      <Col span={18} push={5}>
                        <h1>{ProfileData.getName(this.state.profile)}</h1>
                      </Col>
                      <Col span={6} pull={17}>
                        <Avatar size={128} icon={<UserOutlined />} />
                      </Col>
                    </Row>
                    <h2></h2>
                    <Carousel afterChange={onChange}>
                      <div>
                        <h3 style={contentStyle}></h3>
                      </div>
                    </Carousel>
                    <Descriptions title="About me" bordered>
                      <div className="google-map-code"></div>
                    </Descriptions>
                    <Descriptions title="User Info Card" bordered>
                      <Descriptions.Item label="Name" span={2}>
                        {ProfileData.getName(this.state.profile)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender" span={2}>
                        Male
                      </Descriptions.Item>
                      <Descriptions.Item label="Occupation Status">
                        Crewmate
                      </Descriptions.Item>
                      <Descriptions.Item label="Work hour" span={2}>
                        Korean Standard Time (GMT +9)
                      </Descriptions.Item>
                      <Descriptions.Item label="Skills">
                        C, C++, Python, React
                      </Descriptions.Item>
                      <Descriptions.Item label="Speciality">
                        Front end development
                      </Descriptions.Item>
                      <Descriptions.Item label="Education">
                        University of Melbourne/ Computing/ under grad/
                        2010~2013
                        <br />
                        RMIT/ Computing Graphics/ masters/ 2016~2018
                        <br />
                        University of Melbourne/ Law/ masters/ 2020~2024
                        <br />
                      </Descriptions.Item>
                      <Descriptions.Item label="Job Experience">
                        MicroSoft/ Senior developer/ 3years/ 2003~2006
                        <br />
                        Naver/ Senior developer/ 3years/ 2003~2006
                        <br />
                        Nintendo/ Senior developer/ 3years/ 2003~2006
                        <br />
                        Bethsesda/ Senior developer/ 3years/ 2003~2006
                        <br />
                        Samsong/ Junior developer/ 3years/ 2003~2006
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Social Media" bordered></Descriptions>
                  </Content>
                </Typography>
              </Container>
            </React.Fragment>
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
