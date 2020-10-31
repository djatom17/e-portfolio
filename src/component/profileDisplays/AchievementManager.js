import React, { Component } from "react";
import { Row, Col, Typography, Input, Button } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

const { Title, Paragraph } = Typography;

//TODO: add child to each prop in element in list

export class AchievementManager extends Component {
  state = {
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };
  constructor() {
    super();
    this.handleInputChange = ProfileData.handleInputChange.bind(this);
    this.handleEditInputChange = ProfileData.handleEditInputChange.bind(this);
    this.handleInputConfirm = ProfileData.handleInputConfirm.bind(this);
    this.handleCloseTag = ProfileData.handleCloseTag.bind(this);
    this.handleEditInputConfirm = ProfileData.handleEditInputConfirm.bind(this);
    this.saveInputRef = ProfileData.saveInputRef.bind(this);
    this.saveEditInputRef = ProfileData.saveEditInputRef.bind(this);
    this.deleteButt = ProfileData.deleteButt.bind(this);
  }

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <div>
        <Paragraph className="psize">
          {" "}
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return (
                  <Input.TextArea
                    ref={this.saveEditInputRef}
                    key={item}
                    size="large"
                    value={editInputValue}
                    onChange={this.handleEditInputChange}
                    onBlur={() => this.handleEditInputConfirm("achievements")}
                    onPressEnter={() =>
                      this.handleEditInputConfirm("achievements")
                    }
                  />
                );
              }
              const achievement = (
                <Row key={item}>
                  <Col flex="auto">
                    <Paragraph key={item}>
                      <span
                        onDoubleClick={
                          this.props.isMyProfile && this.props.canEdit
                            ? (e) => {
                                this.setState(
                                  {
                                    editInputIndex: index,
                                    editInputValue: item,
                                  },
                                  () => {
                                    this.editInput.focus();
                                  }
                                );
                                e.preventDefault();
                              }
                            : null
                        }
                      >
                        {item}
                      </span>
                    </Paragraph>
                  </Col>
                  <Col flex="10px">
                    {this.props.isMyProfile && this.props.canEdit
                      ? this.deleteButt("achievements", item)
                      : null}
                  </Col>
                </Row>
              );
              return achievement;
            })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={() => this.handleInputConfirm("achievements")}
              onPressEnter={() => this.handleInputConfirm("achievements")}
            />
          )}
          {!inputVisible && this.props.isMyProfile && this.props.canEdit && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={
                this.props.isMyProfile &&
                this.props.canEdit &&
                ((e) => {
                  this.setState({ inputVisible: true }, () => {
                    this.input.focus();
                  });
                  e.preventDefault();
                })
              }
            >
              New Achievement
            </Button>
          )}
        </Paragraph>
      </div>
    );
  }
}
export default AchievementManager;
