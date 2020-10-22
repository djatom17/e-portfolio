import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Avatar,
  Tag,
  Divider,
  List,
  Typography,
  Card,
  Input,
  Pagination,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  MailOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;
const { Search } = Input;
const defaultIcons = ["in", "tw", "gh"];
class Browse extends Component {
  state = {
    profiles: [],
  };

  componentDidMount = () => {
    this.getProfiles();
  };

  getProfiles = () => {
    axios.get("/info/profiles").then((res) => {
      const data = res.data;
      this.setState({ profiles: data });
      console.log("data received");
    });
  };

  displaySkillTags = (keySkills) => {
    if (!keySkills.length) return null;
    if (keySkills) {
      return keySkills.map((item, index) => <Tag color="#108ee9">{item}</Tag>);
    }
  };

  displayQualifications = (qualifications) => {
    if (!qualifications.length) return null;
    if (qualifications) {
      return (
        <List
          size="small"
          dataSource={qualifications}
          renderItem={(item) => (
            <List.Item className="browse-education">{item}</List.Item>
          )}
        />
      );
    }
  };

  displayJob = (profile) => {
    if (!profile.workHistory.length) return null;
    if (profile.workHistory) {
      return (
        <List size="small" className="browse-career">
          <List.Item>{profile.workHistory[0].role}</List.Item>
          <List.Item>{profile.workHistory[0].workplace}</List.Item>
        </List>
      );
    }
  };

  displayIcon = (str) => {
    if (str == "in") {
      return (
        <Col>
          <a href="https://www.youtube.com/watch?v=3LEwQn8OnEU">
            <LinkedinOutlined />
          </a>
        </Col>
      );
    }
    if (str == "tw") {
      return (
        <Col>
          <TwitterOutlined />
        </Col>
      );
    }
    if (str == "gh") {
      return (
        <Col>
          <GithubOutlined />
        </Col>
      );
    }
    return null;
  };

  displayIcons = (lst) => {
    if (!lst.length) return null;
    if (lst) {
      return lst.map((item, index) => this.displayIcon(item));
    }
  };

  displayProfile = (profiles) => {
    if (!profiles.length) return null;
    return profiles.map((profile, index) => (
      <Card className="m-5" hoverable={true}>
        <div className="browse-outer">
          {/* Row contains: profile name, skills*/}
          <span onClick={() => (window.location.href = profile.linkToProfile)}>
            <Row type="flex" justify="space-between" className="mb-n3">
              <Col className="ml-4">
                <h1 className="browse-name">
                  {profile.firstName.concat(" ", profile.lastName)}
                </h1>
              </Col>
              <Col className="browse-skills mt-2">
                {this.displaySkillTags(profile.keySkills)}
              </Col>
            </Row>
            <Divider />
            {/* Row contains: pfp, (work, education) */}
            <Row>
              <Col>
                <Avatar
                  src={profile.image}
                  shape="square"
                  size={200}
                  className="ml-4"
                />
              </Col>
              <Col offset={1}>
                <Row>
                  <Col>{this.displayJob(profile)}</Col>
                </Row>
                <Row>
                  <Col> {this.displayQualifications(profile.education)}</Col>
                </Row>
              </Col>
            </Row>
          </span>
          {/* Row contains: social media icons, email  */}
          <Row justify="space-between" className="browse-social ml-4">
            <Col>
              <Row gutter={8}>{this.displayIcons(defaultIcons)}</Row>
            </Col>
            <Col className="browse-mail mt-2 mr-2">
              <Paragraph
                copyable={{
                  icon: [
                    <MailOutlined key="copy-icon" />,
                    <CheckOutlined key="copied-icon" />,
                  ],
                  tooltips: ["Copy email!"],
                }}
              >
                superfake@email.com
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Card>
    ));
  };

  render() {
    return (
      <div>
        <p />
        <Row justify="center">
          <Col className="justify-center">
            <h1 className="d-flex  h1size"> Browse to your heart's content!</h1>
          </Col>
        </Row>
        <Row justify="center">
          <Col className="justify-center">
            <Search
              placeholder="Find your Expert"
              enterButton="Search"
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </Col>
        </Row>
        <p />
        <div className="container">
          {this.displayProfile(this.state.profiles)}
        </div>
      </div>
    );
  }
}

export default Browse;
