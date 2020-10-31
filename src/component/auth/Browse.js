import React, { Component } from "react";
import SocialManager from "../profileDisplays/SocialManager";
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
  Button,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  MailOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import AdvancedSearchModal from "../AdvancedSearchModal";

const { Paragraph } = Typography;
const { Search } = Input;
const defaultIcons = ["in", "tw", "gh"];
class Browse extends Component {
  state = {
    profiles: [],
    advancedSearch: false,
  };

  updateBrowse = () => {
    var params = new URLSearchParams(window.location.search);
    // Confirm that the link is not trying to search for a person.
    if (window.location.search.length <= 1) {
      this.getProfiles();
    } else if (params.has("name") || params.has("skills")) {
      // Perform the search
      this.handleSearch(params);
    } else {
      // Invalid search do something
      console.log("Invalid search");
    }
  };

  componentDidMount = () => {
    this.updateBrowse();
  };

  handleSearchClick = (search) => {
    var searchParams = new URLSearchParams("");
    searchParams.set("name", encodeURIComponent(search));
    this.handleSearch(searchParams);
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  };

  handleSearch = (searchParams) => {
    this.setState({ advancedSearch: false });
    var axiosParams = {};
    if (searchParams.get("name") && searchParams.get("name").length > 0) {
      axiosParams.name = searchParams.get("name");
    }
    if (searchParams.get("skills") && searchParams.get("skills").length > 0) {
      axiosParams.skills = searchParams.get("skills");
    }

    axios
      .get("api/mongo/search", {
        params: axiosParams,
      })
      .then((res) => {
        const data = res.data;
        this.setState({ profiles: data });
      });
  };

  getProfiles = () => {
    axios.get("/api/mongo/profiles").then((res) => {
      const data = res.data;
      this.setState({ profiles: data });
    });
  };

  displaySkillTags = (keySkills) => {
    if (!keySkills.length) return null;
    if (keySkills) {
      return keySkills.map((item, index) => (
        <Tag color="#108ee9" key={index}>
          <a href={`/browse?skills=${item}`}>{item}</a>
        </Tag>
      ));
    }
  };

  displayQualifications = (qualifications) => {
    if (!qualifications.length) return null;
    if (qualifications) {
      return (
        <List size="small" className="browse-education">
          <List.Item>
            {qualifications[0].name} @ {qualifications[0].institution}
          </List.Item>
          {qualifications[1] && (
            <List.Item>
              {qualifications[1].name} @ {qualifications[1].institution}
            </List.Item>
          )}
        </List>
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
              <Row>
                <SocialManager isMyProfile={false} canEdit={false} />
              </Row>
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

  onCancelAdvanced = () => {
    this.setState({ advancedSearch: false });
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
              onSearch={this.handleSearchClick}
            />
            <Button
              type="link"
              size="small"
              onClick={() => this.setState({ advancedSearch: true })}
            >
              Advanced Search
            </Button>
          </Col>
        </Row>
        <AdvancedSearchModal
          view={this.state.advancedSearch}
          onCancel={this.onCancelAdvanced.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
        />
        <div className="container">
          {/* <Row justify="center" className="ml-4 mb-n4">
            <Col className="ml-2">
              <Pagination defaultCurrent={1} total={50} />
            </Col>
          </Row> */}
          {this.displayProfile(this.state.profiles)}
        </div>
      </div>
    );
  }
}

export default Browse;
