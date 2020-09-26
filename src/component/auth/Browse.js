import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import { Row, Col, Image, Tag, Divider, List } from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

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
          <List.Item>{profile.workHistory[0]}</List.Item>
          <List.Item>[get current employer from DB]</List.Item>
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
      <div className="browse-outer m-5">
        {/* Row contains: profile name, skills*/}
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
            <img className="rounded ml-4" width={200} src={profile.image} />
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
        {/* Row contains: social media icons  */}
        <Row gutter={8} className="browse-social ml-4">
          {this.displayIcons(defaultIcons)}
        </Row>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1 className="d-flex justify-content-center">
          {" "}
          Browse to your heart's content!
        </h1>
        <p />

        {this.displayProfile(this.state.profiles)}
      </div>
    );
  }
}

// class Browse extends Component
// {
//     state = {
//         profiles : []
//     };

//     componentDidMount = () => {
//         this.getProfiles();
//     };

// getProfiles = () => {
//     axios.get('/info/profiles')
//     .then((res) => {
//         const data = res.data;
//         this.setState({ profiles : data });
//         console.log("data received");
//     });
// }

// displayProfile = (profiles) => {
//     if (!profiles.length) return null;
//     return profiles.map((profile, index) => (
//         <div className="container browse-inner">
//             <div className="container browse-profile-picture">
//                 <img src={profile.image} class="rounded float-left" aria-hidden alt="description of image"/>
//             </div>
//             <div className="container browse-profile-summary">
//                 <h1 className="browse-name">
//                     {profile.firstName.concat(' ', profile.lastName)}
//                 </h1>
//                 <p className="browse-details">
//                     {profile.keySkills.toString()}
//                 </p>
//                 <p className="browse-details">
//                     {profile.workHistory.toString()}
//                 </p>
//                 <p className="browse-details">
//                     {profile.education.toString()}
//                 </p>
//                 <Link to={profile.linkToProfile} className={"btn btn-lg btn-info mr-2"}>
//                     Browse
//                 </Link>
//                 <Link to={"/login"} className={"btn btn-lg btn-light"}>
//                     Send Message
//                 </Link>
//             </div>
//         </div>
//     ));
// };

// render()
// {
//     return(
//     <div className="browse">
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 text-center">
//                     <h1 className="display-4 text-center">
//                         {' '}
//                         Browse to your heart's content!
//                     </h1>
//                     <p/>
//                     <div className="container browse-outer">
//                         {this.displayProfile(this.state.profiles)}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>);
// }
// }

export default Browse;
