import React, { Component, Fragment } from "react";
import { Button, Row, Col, Checkbox } from "antd";
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
    linkedinEnabled: "true",
    twitterEnabled: "",
    githubEnable: "",
  };

  render() {
    if (this.props.isMyProfile && this.props.canEdit) {
      return (
        <Row>
          <Col>
            <Checkbox style={{ position: "relative", top: "3px" }} />
            <Button
              type="link"
              icon={<LinkedinOutlined />}
              className="mt-3"
            />{" "}
          </Col>
          <Col>
            <Checkbox style={{ position: "relative", top: "3px" }} />
            <Button type="link" icon={<TwitterOutlined />} className="mt-3" />
          </Col>

          <Col>
            <Checkbox style={{ position: "relative", top: "3px" }} />
            <Button type="link" icon={<GithubOutlined />} className="mt-3" />
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row>
          <Button type="link" icon={<LinkedinOutlined />} className="mt-3" />{" "}
          <Button type="link" icon={<TwitterOutlined />} className="mt-3" />
          <Button type="link" icon={<GithubOutlined />} className="mt-3" />
        </Row>
      </div>
    );
  }
}

export default SocialManager;
