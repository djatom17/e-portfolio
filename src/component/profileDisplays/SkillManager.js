import React, { Component, Fragment } from "react";
import { Button, Row, Col, Typography, Input, Tag, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

const { Title } = Typography;

export class SkillManager extends Component {
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
  }

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <div className="mb-3">
        {this.props.data &&
          this.props.data.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={this.saveEditInputRef}
                  key={tag}
                  size={40}
                  className="tag-input"
                  value={editInputValue}
                  onChange={this.handleEditInputChange}
                  onBlur={() => this.handleEditInputConfirm("keySkills")}
                  onPressEnter={() => this.handleEditInputConfirm("keySkills")}
                />
              );
            }

            const isLongTag = tag.length > 40;

            const tagElem = (
              <Tag
                className="skills-tag"
                key={tag}
                closable={
                  index !== 0 && this.props.isMyProfile && this.props.canEdit
                }
                onClose={() => this.handleCloseTag("keySkills", tag)}
              >
                <span
                  className="skills-span"
                  onDoubleClick={
                    this.props.isMyProfile && this.props.canEdit
                      ? (e) => {
                          this.setState(
                            { editInputIndex: index, editInputValue: tag },
                            () => {
                              this.editInput.focus();
                            }
                          );
                          e.preventDefault();
                        }
                      : null
                  }
                >
                  {isLongTag ? `${tag.slice(0, 40)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}

        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={() => this.handleInputConfirm("keySkills")}
            onPressEnter={() => this.handleInputConfirm("keySkills")}
          />
        )}
        {!inputVisible && this.props.isMyProfile && this.props.canEdit && (
          <Tag
            className="site-tag-plus"
            onClick={(e) => {
              this.setState({ inputVisible: true }, () => {
                this.input.focus();
              });
              e.preventDefault();
            }}
          >
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default SkillManager;
