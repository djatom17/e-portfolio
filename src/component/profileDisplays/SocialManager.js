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
    editInputValue: "",
    linkedinEnabled: true,
    twitterEnabled: true,
    githubEnabled: true,
    editing: "none",
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
                prefix={<LinkedinOutlined />}
                style={{ position: "relative", top: "8px" }}
                ref={(input) => input && input.focus()}
                onBlur={() => this.setState({ editing: "none" })}
              />
            ) : (
              <Button
                type="link"
                icon={<LinkedinOutlined />}
                onClick={() => this.setState({ editing: "linkedin" })}
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
                prefix={<TwitterOutlined />}
                style={{ position: "relative", top: "8px" }}
                ref={(input) => input && input.focus()}
                onBlur={() => this.setState({ editing: "none" })}
              />
            ) : (
              <Button
                type="link"
                icon={<TwitterOutlined />}
                onClick={() => this.setState({ editing: "twitter" })}
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
                prefix={<GithubOutlined />}
                style={{ position: "relative", top: "8px" }}
                ref={(input) => input && input.focus()}
                onBlur={() => this.setState({ editing: "none" })}
              />
            ) : (
              <Button
                type="link"
                icon={<GithubOutlined />}
                onClick={() => this.setState({ editing: "github" })}
              />
            )}
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row>
          <Button type="link" icon={<LinkedinOutlined />} className="mt-3" />{" "}
          <Button type="link" icon={<TwitterOutlined />} className="mt-3" />{" "}
          <Button type="link" icon={<GithubOutlined />} className="mt-3" />{" "}
        </Row>
      </div>
    );
  }
}

export default SocialManager;
