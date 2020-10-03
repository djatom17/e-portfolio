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

const { Title, Paragraph } = Typography;
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
      <Col>
        <Row>
          <img
            src={this.state.profile.image}
            aria-hidden
            alt="description of image"
            className="prof2-img"
          />
          <div className=" size prof2-text-overlay text-center">
            <p className=" h1 "> {ProfileData.getName(this.state.profile)}</p>
            <p className="psize ">{this.state.profile.subtitle}</p>
            <p className="psize "> Work at home in my penthouse </p>
          </div>
        </Row>
        <Row>
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
                ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
              >
                {this.state.profile.about}
              </Paragraph>
            </div>
          </div>
        </Row>
      </Col>

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
