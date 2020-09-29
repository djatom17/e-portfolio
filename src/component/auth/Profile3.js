import React, { Component } from "react";
// import {Link} from "react-router-dom";
// import axios from 'axios';
import * as ProfileData from "../../api/ProfileData";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Input,
  Button,
  Divider,
  Tabs,
} from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  MailOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;
const { TextArea } = Input;
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
  setText = (str, value) => {
    var temp = { ...this.state.profile };
    temp[value] = str;
    this.setState({ profile: temp });
  };

  componentDidMount = () => {
    this.setState({ profile: this.props.profile });
  };

  getElements = (lst) => {
    if (lst) {
      return lst.map((item, index) => (
        <div className="media">
          <p>{item}</p>
        </div>
      ));
    }
  };

  render() {
    const { about } = this.state;
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
        <Row gutter={24} className="ml-5">
          <Col>
            {" "}
            <Avatar src={this.state.profile.image} shape="square" size={200} />
          </Col>
          <Col xs={4} sm={6} md={10} lg={14} xl={16}>
            <h4>A little bit about me...</h4>
            <Paragraph
              editable={{
                onChange: (str) => this.setText(str, "about"),
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
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Skills" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Projects" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Certificates" key="4">
              Content of Tab Pane 4
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

//   render() {
//     return (
//       <section className="section about-section gray-bg" id="about">
//         <div className="container">
//           <div className="row align-items-center flex-row-reverse">
//             <div className="col-lg-6">
//               <div className="about-text go-to">
//                 <h3 className="dark-color">
//                   {ProfileData.getName(this.state.profile)}'s Flex
//                 </h3>
//                 <h6 className="theme-color lead">
//                   {this.state.profile.subtitle}
//                 </h6>
//                 <br />
//                 {ProfileData.getElements(this.state.profile.achievements)}
//                 <br />

//                 <div className="row about-list">
//                   <div className="col-md-6">
//                     {this.getElements(this.state.profile.shitdone)}
//                     <div className="media"></div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="media">
//                       <label>E-mail</label>
//                       <p>LuciousFox@wayne.com</p>
//                     </div>
//                     <div className="media">
//                       <label>Contact</label>
//                       <p>Bat-Signal</p>
//                     </div>
//                     <div className="media">
//                       <label>MySpace</label>
//                       <p>BillionaireBruce</p>
//                     </div>
//                     <div className="media">
//                       <label>Justice</label>
//                       <p>Available</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="about-avatar">
//                 <img
//                   src={this.state.profile.image}
//                   aria-hidden
//                   alt="description of image"
//                 />
//               </div>
//             </div>
//           </div>
//           <br />
//           <div>
//             <h3 className="display-5 text-lg">Skills</h3>
//             <div className="container text-lg-left">
//               <p></p>
//             </div>
//             <h3 className="display-5 text-lg">About me</h3>
//             <div className="container text-lg-left">
//               <p>{this.state.profile.about}</p>
//             </div>
//             <br />
//             <h3 className="display-5 text-lg">Social Media Links</h3>
//             <div className="row">
//               <div className="col-6 col-lg-3">
//                 <div className="count-data text-center">
//                   <h6 className="count h4" data-to="500" data-speed="500">
//                     Facebook
//                   </h6>
//                   <p className="m-0px font-w-600">
//                     http://facebook/therealbatman
//                   </p>
//                 </div>
//               </div>
//               <div className="col-6 col-lg-3">
//                 <div className="count-data text-center">
//                   <h6 className="count h4" data-to="500" data-speed="500">
//                     LinkedIn
//                   </h6>
//                   <p className="m-0px font-w-600">
//                     http://LinkedIn/therealbatman
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default Profile3;
