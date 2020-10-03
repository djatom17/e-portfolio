import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ProfileData from "../../api/ProfileData";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Menu,
  Upload,
  message,
  Typography,
  Avatar,
  Input,
  Button,
  Modal,
  Tag,
} from "antd";
import {
  InboxOutlined,
  UserOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";

class Profile2 extends Component {
  state = {
    profile: {},
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

  render() {
    return (
      <Row
        style={{ background: this.state.profile.image }}
        className="prof4-img"
      >
        <div className="prof4-img" background={this.state.profile.image}></div>
        {/* <img
          src={this.state.profile.image}
          aria-hidden
          alt="description of image"
          className="prof4-img"
        /> */}
      </Row>
      // <div className="profile">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-mid-8 m-auto">
      //         <h1 className="display-4 text-center">
      //           {ProfileData.getName(this.state.profile)}
      //         </h1>
      //         <p className="lead text-center">{this.state.profile.subtitle}</p>
      //         <div className="container browse-outer">
      //           <div className="container browse-profile-picture">
      //             <img
      //               src={this.state.profile.image}
      //               aria-hidden
      //               alt="description of image"
      //             />
      //           </div>
      //           <Tabs defaultTab="basic-tab-one">
      //             <TabList>
      //               <Tab tabFor="basic-tab-one">About me</Tab>
      //               <Tab tabFor="basic-tab-two">Achievements</Tab>
      //               <Tab tabFor="basic-tab-three">Skills</Tab>
      //             </TabList>
      //             <TabPanel tabId="basic-tab-one">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name ">About me</h1>
      //                 <p>{this.state.profile.about}</p>
      //               </div>
      //             </TabPanel>
      //             <TabPanel tabId="basic-tab-two">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name">Achievments</h1>
      //                 {ProfileData.getElements(this.state.profile.achievements)}
      //               </div>
      //             </TabPanel>
      //             <TabPanel tabId="basic-tab-three">
      //               <div className="tab-inner">
      //                 <h1 className="display-5 browse-name">Skills</h1>
      //                 {ProfileData.getElements(this.state.profile.keySkills)}
      //               </div>
      //             </TabPanel>
      //           </Tabs>

      //           <div className="text-left social-media-links">
      //             <h3>Social Media Links</h3>
      //             <div>
      //               <p>{ProfileData.getElements(this.state.profile.social)}</p>
      //             </div>
      //           </div>
      //         </div>
      //         <p></p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile2);
