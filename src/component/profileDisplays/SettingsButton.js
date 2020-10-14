import React, { Component, Fragment } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";

export class SettingsButton extends Component {
  render() {
    return (
      <Fragment>
        <Button type="primary" onClick={this.props.showModal}>
          Settings
        </Button>
      </Fragment>
    );
  }
}
export default SettingsButton;
