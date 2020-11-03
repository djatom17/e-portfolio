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

  // save checks
  saveChecks = (e, name) => {
    if (name === "linkedin") {
      this.setState({
        linkedinEnabled: e.target.checked,
      });
      this.props.changeObj(
        "social",
        "linkedin",
        "isEnabled",
        e.target.checked,
        this.props.data,
        this.props.data.linkedin
      );
    }
    if (name === "twitter") {
      this.setState({
        twitterEnabled: e.target.checked,
      });
      this.props.changeObj(
        "social",
        "twitter",
        "isEnabled",
        e.target.checked,
        this.props.data,
        this.props.data.twitter
      );
    }
    if (name === "github")
      this.setState({
        githubEnabled: e.target.checked,
      });
    this.props.changeObj(
      "social",
      "github",
      "isEnabled",
      e.target.checked,
      this.props.data,
      this.props.data.github
    );
  };

  // save links
  saveChanges = () => {
    const { editing, editInputValue } = this.state;
    if (editing === "linkedin") {
      this.setState({
        editing: "none",
        linkedinLink: editInputValue,
        editInputValue: "",
      });
      // change only linkedin
      this.props.changeObj(
        "social",
        "linkedin",
        "link",
        editInputValue,
        this.props.data,
        this.props.data.linkedin
      );
    }

    if (editing == "twitter") {
      this.setState({
        editing: "none",
        twitterLink: editInputValue,
        editInputValue: "",
      });
      // change only twitter
      this.props.changeObj(
        "social",
        "twitter",
        "link",
        editInputValue,
        this.props.data,
        this.props.data.twitter
      );
    }

    if (editing == "github") {
      this.setState({
        editing: "none",
        githubLink: editInputValue,
        editInputValue: "",
      });
      // change only github
      this.props.changeObj(
        "social",
        "github",
        "link",
        editInputValue,
        this.props.data,
        this.props.data.github
      );
    }
  };

  render() {
    const { editing } = this.state;
    if (this.props.isMyProfile && this.props.canEdit) {
      return (
        <Row gutter={4} className="mt-3">
          <Col>
            <Checkbox
              checked={this.state.linkedinEnabled}
              onChange={(e) => this.saveChecks(e, "linkedin")}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing === "linkedin" ? (
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
              onChange={(e) => this.saveChecks(e, "twitter")}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing === "twitter" ? (
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
              onChange={(e) => this.saveChecks(e, "github")}
              style={{ position: "relative", top: "8px" }}
            />{" "}
          </Col>
          <Col>
            {editing === "github" ? (
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
