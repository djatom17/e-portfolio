import React, { Component } from "react";
import { Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PresetColorTypes } from "antd/lib/_util/colors";

class EditableText extends Component {
  state = {
    text: this.props.text,
    editMode: false,
  };

  changeEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  changeText = (e) => {
    this.setState({ editMode: false, text: e.target.value });
  };
  renderNormalView = () => {
    return <div onDoubleClick={this.changeEditMode}>{this.state.text}</div>;
  };

  renderEditView = () => {
    return (
      <div>
        <Input
          defaultValue={this.state.text}
          onPressEnter={this.changeText}
          id="1"
          on
        />
        <Button onClick={this.changeEditMode}>X</Button>
      </div>
    );
  };

  render() {
    return this.state.editMode
      ? this.renderEditView()
      : this.renderNormalView();
  }
}

export default EditableText;
