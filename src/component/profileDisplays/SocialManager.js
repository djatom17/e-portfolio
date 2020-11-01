import React, { Component, Fragment } from "react";
import { Button, Row, Col, Checkbox, Input } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  PlusOutline,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

export class SocialManager extends Component {
  state = {
    linkedinEnabled: false,
    twitterEnabled: false,
    githubEnabled: false,
    linkedinLink: "",
    twitterLink: "",
    githubLink: "",
    editing: "none",
    editInputValue: "",
    textColour: "#40A9FF",
  };

  componentDidMount() {
    this.saveEditInputRef = ProfileData.saveEditInputRef.bind(this);
    this.handleEditInputChange = ProfileData.handleEditInputChange.bind(this);

    if (this.props.textColour) {
      this.setState({ textColour: this.props.textColour });
    }

    if (this.props.data) {
      if (this.props.data.github) {
        this.setState({
          githubEnabled: this.props.data.github.isEnabled,
          githubLink: this.props.data.github.link,
        });
      }
      if (this.props.data.twitter) {
        this.setState({
          twitterEnabled: this.props.data.twitter.isEnabled,
          twitterLink: this.props.data.twitter.link,
        });
      }
      if (this.props.data.linkedin) {
        console.log(this.props.data.linkedin.link);
        this.setState({
          linkedinEnabled: this.props.data.linkedin.isEnabled,
          linkedinLink: this.props.data.linkedin.link,
        });
      }
    }
  }

  // save all changes before unmounting
  saveChanges = () => {
    // set inner objects
    var newLinkedin = {
      link: this.state.linkedinLink,
      isEnabled: this.state.linkedinEnabled,
    };
    var newTwitter = {
      link: this.state.twitterLink,
      isEnabled: this.state.twitterEnabled,
    };
    var newGithub = {
      link: this.state.githubLink,
      isEnabled: this.state.githubEnabled,
    };

    // set outer object
    var newSocial = {
      linkedin: newLinkedin,
      twitter: newTwitter,
      github: newGithub,
    };

    this.props.changeObj("social", newSocial);
  };

  // check/uncheck linkedin
  checkLinkedin = (e) => {
    this.setState({
      linkedinEnabled: e.target.checked,
    });
  };

  // check/uncheck twitter
  checkTwitter = (e) => {
    this.setState({
      twitterEnabled: e.target.checked,
    });
  };

  // check/uncheck github
  checkGithub = (e) => {
    this.setState({
      githubEnabled: e.target.checked,
    });
  };

  render() {
    const { editing } = this.state;
    if (this.props.isMyProfile && this.props.canEdit) {
      return (
        <Row gutter={4} className="mt-3">
          <Col>
            <Checkbox
              checked={this.state.linkedinEnabled}
              onChange={this.checkLinkedin}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing == "linkedin" ? (
              <Input
                size="small"
                placeholder="Linkedin"
                prefix={
                  <div>
                    <LinkedinOutlined /> http://linkedin.com/in/
                  </div>
                }
                style={{ position: "relative", top: "8px" }}
                value={this.state.editInputValue}
                ref={(input) => input && input.focus()}
                onChange={this.handleEditInputChange}
                onPressEnter={() => {
                  this.setState({
                    editing: "none",
                    linkedinLink: this.state.editInputValue,
                    editInputValue: "",
                  });
                  this.saveChanges();
                }}
              />
            ) : (
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<LinkedinOutlined />}
                onClick={() =>
                  this.setState({
                    editing: "linkedin",
                    editInputValue: this.state.linkedinLink,
                  })
                }
              />
            )}
          </Col>
          <Col>
            {" "}
            <Checkbox
              checked={this.state.twitterEnabled}
              onChange={this.checkTwitter}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing == "twitter" ? (
              <Input
                size="small"
                placeholder="Twitter"
                prefix={
                  <div>
                    <TwitterOutlined /> https://twitter.com/
                  </div>
                }
                style={{ position: "relative", top: "8px" }}
                value={this.state.editInputValue}
                // focus on render
                ref={(input) => input && input.focus()}
                onChange={this.handleEditInputChange}
                onPressEnter={() => {
                  this.setState({
                    editing: "none",
                    twitterLink: this.state.editInputValue,
                    editInputValue: "",
                  });
                  this.saveChanges();
                }}
              />
            ) : (
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<TwitterOutlined />}
                onClick={() =>
                  this.setState({
                    editing: "twitter",
                    editInputValue: this.state.twitterLink,
                  })
                }
              />
            )}
          </Col>
          <Col>
            <Checkbox
              checked={this.state.githubEnabled}
              onChange={this.checkGithub}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing == "github" ? (
              <Input
                size="small"
                placeholder="GitHub"
                prefix={
                  <div>
                    <GithubOutlined /> https://github.com/
                  </div>
                }
                style={{ position: "relative", top: "8px" }}
                value={this.state.editInputValue}
                ref={(input) => input && input.focus()}
                onChange={this.handleEditInputChange}
                onPressEnter={() => {
                  this.setState({
                    editing: "none",
                    githubLink: this.state.editInputValue,
                    editInputValue: "",
                  });
                  this.saveChanges();
                }}
              />
            ) : (
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<GithubOutlined />}
                onClick={() =>
                  this.setState({
                    editing: "github",
                    editInputValue: this.state.githubLink,
                  })
                }
              />
            )}
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row>
          {this.state.linkedinEnabled ? (
            <a
              target="_blank"
              href={"http://linkedin.com/in/" + this.state.linkedinLink}
            >
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<LinkedinOutlined />}
                className="mt-3"
              />
            </a>
          ) : null}
          {this.state.twitterEnabled ? (
            <a
              target="_blank"
              href={"https://twitter.com/" + this.state.twitterLink}
            >
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<TwitterOutlined />}
                className="mt-3"
              />
            </a>
          ) : null}
          {this.state.githubEnabled ? (
            <a
              target="_blank"
              href={"https://github.com/" + this.state.githubLink}
            >
              <Button
                type="link"
                style={{ color: this.state.textColour }}
                icon={<GithubOutlined />}
                className="mt-3"
              ></Button>
            </a>
          ) : null}{" "}
        </Row>
      </div>
    );
  }
}

export default SocialManager;
