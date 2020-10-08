import React, { Component } from "react";
import { connect } from "react-redux";
import * as ProfileData from "../../api/ProfileData";
import "react-web-tabs/dist/react-web-tabs.css";
import {
  Row, Col,
  Typography, UserOutlined, Descriptions, Badge,
  Input, Button, Tag, Avatar, Tooltip, Anchor,
  Carousel,} from "antd";
import {DeleteOutlined, PlusOutlined,} from "@ant-design/icons";
import "antd/dist/antd.css";

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
    // this.setState({ editInputIndex: -1, editInputValue: "" });
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
    // for tags
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;

    // Adjustment setting box
    const contentStyle = {
      height: "160px",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79"
    };

    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (
        <div className="App">
          <Row>
            <Col span={18} push={5}>
              <h1>Importster's Profile</h1>
            </Col>
            <Col span={6} pull={17}>

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
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <h2></h2>
          <Descriptions title="User Info Card" bordered>
            <Descriptions.Item label="Name" span={2}>
              Red
            </Descriptions.Item>
            <Descriptions.Item label="Sex" span={2}>
              Yes please
            </Descriptions.Item>
            <Descriptions.Item label="Occupation Status">Crewmate</Descriptions.Item>
            <Descriptions.Item label="Date of Brith">2018-04-24</Descriptions.Item>
            <Descriptions.Item label="Usage Time" span={2}>
              2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="In Medbay" />
            </Descriptions.Item>
            <Descriptions.Item label="GPA">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
            <Descriptions.Item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </Descriptions.Item>
          </Descriptions>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);