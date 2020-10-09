import React, { Component, Fragment } from "react";
import { Modal, Button, Row, Col, Avatar, Typography, Input, Tag } from "antd";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export class DispAchievements extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Title className="h1size">{this.props.title}</Title>
        <div>
          <Paragraph>
            {" "}
            {this.props.data &&
              this.props.data.map((item, index) => {
                if (this.props.editInputIndex === index) {
                  return (
                    <Input.TextArea
                      ref={this.saveEditInputRef}
                      key={item}
                      size="large"
                      value={this.props.editInputValue}
                      onChange={this.props.handleEditInputChange}
                      onBlur={() => this.handleEditInputConfirm("achievements")}
                      onPressEnter={() =>
                        this.handleEditInputConfirm("achievements")
                      }
                    />
                  );
                }
                const achievement = (
                  <Row>
                    <Col flex="auto">
                      <Paragraph key={item}>
                        <span
                          onDoubleClick={
                            this.props.isMyProfile &&
                            this.props.canEdit &&
                            ((e) => this.props.openEditbox(index, item, e))
                          }
                        >
                          {item}
                        </span>
                      </Paragraph>
                    </Col>
                    <Col flex="10px">
                      {this.props.isMyProfile && this.props.canEdit
                        ? this.props.deleteButt(item)
                        : null}
                    </Col>
                  </Row>
                );
                return achievement;
              })}
            {this.props.inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                value={this.props.inputValue}
                onChange={() => this.props.handleInputChange()}
                onBlur={() => this.props.handleInputConfirm("achievements")}
                onPressEnter={() =>
                  this.props.handleInputConfirm("achievements")
                }
              />
            )}
            {!this.props.inputVisible &&
              this.props.isMyProfile &&
              this.props.canEdit && (
                <Tag className="site-tag-plus" onClick={this.props.showInput}>
                  <PlusOutlined /> New Achievement
                </Tag>
              )}
          </Paragraph>
        </div>
      </div>
    );
  }
}
export default DispAchievements;
