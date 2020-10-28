import React, { Component, Fragment } from "react";
import { Button, Row, Col, Typography, Input, Tag, Tooltip } from "antd";
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
  state = {};

  render() {
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
