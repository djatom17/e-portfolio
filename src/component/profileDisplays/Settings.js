import React, { Component, Fragment } from "react";
import { Modal, Button, Row, Col, Avatar, Tabs, Select } from "antd";
import { connect } from "react-redux";
import { showSettings, hideSettings } from "../../actions/profileActions";
import * as ProfileData from "../../api/ProfileData";
import "antd/dist/antd.css";

const { TabPane } = Tabs;
const { Option } = Select;

class Settings extends Component {
  state = {
    layout: "0",
    color: "#fff",
    theme: "0",
  };

  componentDidMount = () => {
    this.setState({ layout: this.props.layout });
  };

  handleOk = () => {
    const { layout } = this.state;
    this.props.hideSettings();
    if (layout) {
      ProfileData.updateProfile(
        this.props.pid,
        { layout: layout },
        this.props.token
      );
      window.location.reload();
    }
  };

  // handleCancel = () => {
  //   this.setState({ isVisible: false });
  // };

  render() {
    const { isVisible } = this.props;
    return (
      <Fragment>
        <Modal
          visible={isVisible}
          title="Customisablity Settings"
          onCancel={this.props.hideSettings}
          footer={[
            <Button key="back" onClick={this.props.hideSettings}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              // loading={this.props.loading}
              onClick={this.handleOk}
            >
              Save
            </Button>,
          ]}
        >
          <div>
            <Tabs tabPosition="left">
              <TabPane tab="Layouts" key="1">
                <Row gutter={20}>
                  <Col>
                    {" "}
                    <Avatar
                      shape="square"
                      size={64}
                      style={
                        this.state.layout === "1"
                          ? {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "purple",
                              borderWidth: 2.5,
                              borderColor: "black",
                              borderStyle: "solid",
                            }
                          : {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "purple",
                            }
                      }
                      onClick={() => this.setState({ layout: "1" })}
                    >
                      Layout 1
                    </Avatar>
                  </Col>
                  <Col>
                    <Avatar
                      shape="square"
                      size={64}
                      style={
                        this.state.layout === "2"
                          ? {
                              color: "white",
                              backgroundColor: "#40E0D0",
                              cursor: "pointer",
                              borderWidth: 2.5,
                              borderColor: "black",
                              borderStyle: "solid",
                            }
                          : {
                              color: "white",
                              backgroundColor: "#40E0D0",
                              cursor: "pointer",
                            }
                      }
                      onClick={() => this.setState({ layout: "2" })}
                      cursor="pointer"
                    >
                      Layout 2
                    </Avatar>
                  </Col>
                </Row>
                <br />
                <Row gutter={20}>
                  <Col>
                    {" "}
                    <Avatar
                      shape="square"
                      size={64}
                      style={
                        this.state.layout === "3"
                          ? {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "blue",
                              borderWidth: 2.5,
                              borderColor: "black",
                              borderStyle: "solid",
                            }
                          : {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "blue",
                            }
                      }
                      onClick={() => this.setState({ layout: "3" })}
                    >
                      Layout 3
                    </Avatar>
                  </Col>
                  <Col>
                    <Avatar
                      shape="square"
                      size={64}
                      style={
                        this.state.layout === "5"
                          ? {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "orange",
                              borderWidth: 2.5,
                              borderColor: "black",
                              borderStyle: "solid",
                            }
                          : {
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "orange",
                            }
                      }
                      onClick={() => this.setState({ layout: "5" })}
                    >
                      Layout 4
                    </Avatar>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Colour-Themes" key="2">
                <Row>
                  <Col>
                    {/* <SketchPicker
                      disableAlpha
                      color={this.state.color}
                      onChangeComplete={(e) =>
                        this.handleChangeComplete(e, this.state.colorSection)
                      }
                    /> */}
                  </Col>
                  <Col>
                    <Select
                      defaultValue="0"
                      onSelect={(key) => this.props.themeCustom(key)}
                    >
                      <Option value="0">Default</Option>
                      <Option value="1">Theme-1</Option>
                      <Option value="2"> Theme-2</Option>
                      <Option value="3"> Theme-3</Option>
                      <Option value="4"> Theme-4</Option>
                    </Select>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  isVisible: state.profile.showSettings,
});

export default connect(mapStateToProps, { showSettings, hideSettings })(
  Settings
);
