import React, { Component, Fragment } from "react";
import {Button, Row, Col, Typography, Input, Tag } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title} = Typography;

export class SkillManager extends Component {
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

    this.props.changeSkill(
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
    this.props.changeSkill(
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

      
    this.props.changeSkill(
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

  render () {
    const {
        inputVisible,
        inputValue,
        editInputIndex,
        editInputValue,
      } = this.state;
      return ( 
    <div>
      <Title>Key Skills</Title>
      <div>
         
        {this.state.profile.keySkills &&
          this.state.profile.keySkills.map((tag, index) => {
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
                  onPressEnter={() =>
                    this.handleEditInputConfirm("keySkills")
                  }
                />
              );
            }

            const isLongTag = tag.length > 40;

            const tagElem = (
              <Tag
                className="skills-tag"
                key={tag}
                closable={
                  index !== 0 &&
                  this.props.isMyProfile &&
                  this.props.canEdit
                }
                onClose={() => this.handleCloseTag("keySkills", tag)}
              >
                <span
                  className="skills-span"
                  onDoubleClick={
                    this.props.isMyProfile &&
                    this.props.canEdit &&
                    ((e) => {
                      this.setState(
                        { editInputIndex: index, editInputValue: tag },
                        () => {
                          this.editInput.focus();
                        }
                      );
                      e.preventDefault();
                    })
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
          <Tag className="site-tag-plus" onClick={((e) => {
            this.setState({ inputVisible: true }, () => {
              this.input.focus();
            });
            e.preventDefault();
          })}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
        </div> 
        </div>)
  }
}

export default SkillManager;