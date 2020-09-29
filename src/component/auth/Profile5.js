import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from "../../api/ProfileData";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import { Layout, Row, Col, Avatar, Menu } from "antd";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const { Content, Sider } = Layout;

class Profile5 extends Component {
  state = {
    profile: {},
    tabdisp: "",
  };
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ tabdisp: e.key });
  };

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
  };
  setEditableStr = (value, str) => {
    var aman = { ...this.state.profile};
    aman[value] = str;
    this.setState({ profile: aman });
  };

  displayProfileSeg = () => {
    if (this.state.tabdisp === "about") {
      return (
        <div>
          <Title className="h1size">About Me</Title>
          <div>
            <Paragraph
              editable={{
                onChange: (e) => this.setEditableStr("about", e),
              }}
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              {this.state.profile.about}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "achievements") {
      return (
        <div>
          <Title className="h1size">Achievements</Title>
          <div>
            <Paragraph className="psize">
              {ProfileData.getElements(this.state.profile.achievements)}
            </Paragraph>
          </div>
        </div>
      );
    } else if (this.state.tabdisp === "skills") {
      return (
        <div>
          <Title className="h1size">Skills</Title>
          <div>
            <Paragraph className="psize">
              {ProfileData.getElements(this.state.profile.keySkills)}
            </Paragraph>
          </div>
        </div>
      );
    }
  };

  render() {
    const { current } = this.state.tabdisp;
    return (
      // <div className="profile">
      //     <div className="container">
      //         <div className={"row"}>
      //             <div className="col-mid-8 m-auto">
      //                 <h1 className="display-4 text-center"> {ProfileData.getName(this.state.profile)} Flex page</h1>
      //                 <p className={"lead text-center"}>
      //                     {this.state.profile.subtitle}
      //                 </p>
      //                 <div className="container browse-outer">
      //                     {/* <div className="container browse-profile-picture">
      //                         <img src={this.state.profile.image} aria-hidden alt="description of image"/>
      //                     </div> */}
      //                     <Tabs defaultTab="vertical-tab-one" vertical>
      //                         <TabList>
      //                         <div className="container browse-profile-picture">
      //                             <img src={this.state.profile.image} aria-hidden alt="description of image"/>
      //                         </div>
      //                             <Tab tabFor="vertical-tab-one">About Me</Tab>
      //                             <Tab tabFor="vertical-tab-two">Achievements</Tab>
      //                             <Tab tabFor="vertical-tab-three">Skills</Tab>
      //                             </TabList>
      //                             <TabPanel tabId="vertical-tab-one" className="tab-inner">
      //                             <h1 className="display-5 text-lg">
      //                                 About Me
      //                             </h1>
      //                             <div className="container browse-profile-summary">
      //                                 <p>
      //                                     {this.state.profile.about}
      //                                 </p>
      //                             </div>
      //                             </TabPanel>
      //                             <TabPanel tabId="vertical-tab-two" className="tab-inner">
      //                             <h1 className="display-5 text-lg">
      //                                 Achievements
      //                             </h1>
      //                             <div className="container browse-profile-summary">
      //                                 {ProfileData.getElements(this.state.profile.achievements)}
      //                             </div>
      //                             </TabPanel>
      //                             <TabPanel tabId="vertical-tab-three" className="tab-inner">
      //                             <h1 className="display-5 text-lg">
      //                                 Skills
      //                             </h1>
      //                             <div className="container browse-profile-summary">
      //                                 {ProfileData.getElements(this.state.profile.keySkills)}
      //                             </div>
      //                             </TabPanel>
      //                     </Tabs>
      //                     {/* <div className="container browse-profile-summary">
      //                         <h1 className="display-5 browse-name">
      //                             Achievements
      //                         </h1>
      //                         <div className="container browse-profile-summary">
      //                             {ProfileData.getElements(this.state.profile.achievements)}
      //                         </div>
      //                     </div> */}
      //                 </div>
      //                 <p>

      //                 </p>

      //                 <p>

      //                 </p>
      //                 <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
      //                     Edit
      //                 </Link>
      //                 <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
      //                     Upload
      //                 </Link>
      //                 <Link to="/profile" className={"btn btn-lg btn-info mr-2"}>
      //                     Message
      //                 </Link>
      //                 {/* <h1 className="display-5 text-lg">
      //                     About Me
      //                 </h1>
      //                 <div className="container browse-profile-summary">
      //                     <p>
      //                         {this.state.profile.about}
      //                     </p>
      //                 </div> */}
      //                 <h1 className="display-5 text-lg">
      //                     Social Media Links
      //                 </h1>
      //                 <div className="container browse-profile-summary">
      //                     {ProfileData.getElements(this.state.profile.social)}
      //                 </div>

      //             </div>
      //         </div>
      //     </div>
      // </div>
      <div className="container-fluid ml-n3">
        <Row>
          <Col flex={1}>
            <div className="prof5">
              <div className="container-fluid prof5-img">
                <img
                  src={this.state.profile.image}
                  aria-hidden
                  alt="description of image"
                  className="mt-4 "
                />
              </div>
              <div className="prof5-img">
                <Title className=" text-center">
                  {" "}
                  {ProfileData.getName(this.state.profile)}
                </Title>
                <Paragraph className={"text-center"}>
                  {this.state.profile.subtitle}
                </Paragraph>
              </div>
              <div>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[current]}
                  mode="vertical"
                  style={{ backgroundColor: "coral" }}
                  className="text-center"
                >
                  <Menu.Item key="about" className="modified-item">
                    About Me
                  </Menu.Item>
                  <Menu.Item key="achievements" className="modified-item">
                    Achievements
                  </Menu.Item>
                  <Menu.Item key="skills" className="modified-item">
                    Skills
                  </Menu.Item>
                </Menu>
              </div>
            </div>
          </Col>
          <Col offset={2} flex={5} className="prof5-about ml-n3">
            {this.displayProfileSeg()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile5;
