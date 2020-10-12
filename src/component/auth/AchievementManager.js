import React, { Component, Fragment } from "react";
import {Button, Row, Col, Typography, Input, Tag } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export class AchievementManager extends Component {
  state = {
    profile: {},
    profileChanges: {},
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };
  componentDidMount() {
    this.setState({
      profile: this.props.profile,
      profileChanges: this.props.profileChanges
    });
  }
  // dynamic tag methods (delete, add, edit)
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleInputConfirm = (fieldName) => {
    let { profile, inputValue, profileChanges } = this.state;

    // confirm if array, and item to be add is not empty
    // checks for duplicates, but maybe not do that here (?)
    if (
      inputValue &&
      profile[fieldName] &&
      profile[fieldName].indexOf(inputValue) === -1
    ) {
      profile[fieldName] = [...profile[fieldName], inputValue];
      profileChanges[fieldName] = [...profile[fieldName]];
    }
    this.setState({
      profile,
      profileChanges,
      inputVisible: false,
      inputValue: "",
    });

    this.props.changeAchievement(
      this.state.profile,
      this.state.profileChanges
    );
  };

  handleCloseTag = (fieldName, removedTag) => {
    const field = this.state.profile[fieldName].filter(
      (tag) => tag !== removedTag
    );
    let { profile, profileChanges } = this.state;
    profile[fieldName] = field;
    profileChanges[fieldName] = field;
    this.setState({
      profile,
      profileChanges,
      editInputIndex: -1,
      editInputValue: "",
    });
    this.props.changeAchievement(
      this.state.profile,
      this.state.profileChanges
    );
    // this.setState({ editInputIndex: -1, editInputValue: "" });
  };

  handleEditInputConfirm = (fieldName) => {
    let { profile, profileChanges,  editInputValue, editInputIndex  } = this.state;
    
      var newTags = [...profile[fieldName]];
      newTags[editInputIndex] = editInputValue;
      profile[fieldName] = newTags;
      profileChanges[fieldName] = newTags;

      console.log(this.state.profile)
      this.setState({
        profile,
        profileChanges,
        editInputIndex: -1,
        editInputValue: "",
      });
      console.log(this.state.profile)

      
    this.props.changeAchievement(
      this.state.profile,
      this.state.profileChanges
    );
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  // delete button for achievements
  deleteButt = (item) => {
    return (
      <Button
        type="link"
        onClick={() => this.handleCloseTag("achievements", item)}
      >
        <DeleteOutlined />
      </Button>
    );
  };

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <div>
        <Title>Achievements</Title>
        {console.log(this.state.profile.achievements)}
        <div>
          <Paragraph>
            {" "}
            
            {this.state.profile.achievements &&
              this.state.profile.achievements.map((item, index) => {
                
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
                  <Row>
                    <Col flex="auto">
                      <Paragraph key={item}>
                        <span
                          onDoubleClick={
                            this.props.isMyProfile &&
                            this.props.canEdit &&
                            ((e) => {
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
                            })
                          }
                        >
                          {item}
                        </span>
                      </Paragraph>
                    </Col>
                    <Col flex="10px">
                      {this.props.isMyProfile && this.props.canEdit
                        ? this.deleteButt(item)
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
              <Tag
                className="site-tag-plus"
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
                <PlusOutlined /> New Achievement
              </Tag>
            )}
          </Paragraph>
        </div>
      </div>
    );
  }
}
export default AchievementManager;
