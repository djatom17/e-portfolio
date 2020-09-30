import React, { Component } from "react";
// import {Link} from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from "../../api/ProfileData";
import {
  Row,
  Col,
  Avatar,
  Typography,
  // Input,
  Button,
  Divider,
  Tabs,
  Form,
  Upload,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import SkillManager from "./SkillManager";

const { Paragraph } = Typography;
// const { TextArea } = Input;
const { TabPane } = Tabs;

// function for tabs
function callback(key) {
  console.log(key);
}

class Profile3 extends Component {
  state = {
    profile: {},
  };

  // functions for editing text
  setEditableStr = (value, str) => {
    var temp = { ...this.state.profile };
    temp[value] = str;
    this.setState({ profile: temp });
  };

  setEditableStrArr = (property, index, str) => {
    var temp = { ...this.state.profile };
    temp[property][index] = str;
    this.setState({ profile: temp });
  };

  getElements(lst, property) {
    if (lst) {
      return lst.map((item, index) => (
        <Paragraph
          className="psize"
          editable={{
            onChange: (e) => this.setEditableStrArr(property, index, e),
          }}
        >
          {item}
        </Paragraph>
      ));
    }
  }

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
  };

  render() {
    // for upload
    const normFile = (e) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    return (
      <div clasName="container-fluid mx-4">
        {/* row contains: name, curr job */}

        <Row className=" mt-4 ml-5">
          <h2>
            {ProfileData.getName(this.state.profile)}
            {", "}
            <small>[get job from db]</small>
          </h2>
        </Row>
        {/* row contains: pfp, about me, social media icons */}
        <Row justify="space-around" gutter={24} className="mx-5">
          <Col>
            {" "}
            <Avatar src={this.state.profile.image} shape="square" size={200} />
          </Col>
          <Col xs={4} sm={6} md={10} lg={14} xl={16}>
            <h4>A little bit about me...</h4>
            <Paragraph
              editable={{
                onChange: (str) => this.setEditableStr("about", str),
                autoSize: { minRows: 1, maxRows: 5 },
              }}
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
        <Divider />
        {/* row contains: tabs  */}
        <Row className=" my-4 ml-5">
          <Tabs onChange={callback} type="card">
            <TabPane tab="Achievements" key="1">
              {this.getElements(
                this.state.profile.achievements,
                "achievements"
              )}
            </TabPane>
            <TabPane tab="Skills" key="2">
              {this.getElements(this.state.profile.keySkills, "keySkills")}
              <SkillManager />
            </TabPane>
            <TabPane tab="Projects" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Certificates" key="4">
              <Form>
                <Form.Item
                  name="upload"
                  label="New File"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Contact Details" key="5">
              Content of Tab Pane 5
            </TabPane>
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default Profile3;
