import React, { Component } from "react";

import { connect } from "react-redux";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import {
  Row, Col,
  Descriptions, Badge,
  Input, Button, Tag, Avatar, Tooltip, Anchor,
  Carousel} from "antd";
import {DeleteOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
      background: "#364d79"
    };

    const { Header, Content, Footer } = Layout;

    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (
        <div className="App">
          <React.Fragment>
            <CssBaseline />
            <React.Fragment>
              <CssBaseline />
              <Container fixed>
                <Typography component="div" style={{ backgroundColor: '#ffffff', height: 'auto' }}>
                  <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>Browse</Breadcrumb.Item>
                      <Breadcrumb.Item>Profile</Breadcrumb.Item>
                      <Breadcrumb.Item>{ProfileData.getName(this.state.profile)}</Breadcrumb.Item>
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
                        <h3 style={contentStyle}>1</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>2</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>3</h3>
                      </div>
                    </Carousel>
                    <Descriptions title="User Info Card" bordered>
                      <Descriptions.Item label="Name" span={2}>
                        {ProfileData.getName(this.state.profile)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender" span={2}>
                        Male
                      </Descriptions.Item>
                      <Descriptions.Item label="Occupation Status">Crewmate</Descriptions.Item>
                      <Descriptions.Item label="Date of Brith">2018-04-24</Descriptions.Item>
                      <Descriptions.Item label="Work hour" span={2}>
                        Korean Standard Time (GMT +9)
                      </Descriptions.Item>
                      <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Junior developer that Naver" />
                      </Descriptions.Item>
                      <Descriptions.Item label="GPA">9000</Descriptions.Item>
                      <Descriptions.Item label="Skills">C, C++, Python, React</Descriptions.Item>
                      <Descriptions.Item label="Speciality">Front end development</Descriptions.Item>
                      <Descriptions.Item label="Education">
                        University of Melbourne/ Computing/ under grad/ 2010~2013
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
                    <Descriptions title="Workplace" bordered>
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                          width="600" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                          tabIndex="0">
                      </iframe>
                    </Descriptions>
                    <Descriptions title="Social Media" bordered>
                      <div className="google-map-code">

                      </div>
                    </Descriptions>
                  </Content>
                </Typography>
              </Container>
            </React.Fragment>
          </React.Fragment>
        </div>
    )}
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);