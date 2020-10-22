import React, { Component, Fragment } from "react";
import { Modal, Button, Row, Col, Avatar, Tabs } from "antd";
import { SketchPicker } from "react-color";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

export class Settings extends Component {
  state = {
    layout: "0",
    color: "#fff",
  };

  componentDidMount = () => {
    this.setState({ layout: this.props.layout });
  };
  handleChangeComplete = (color, str) => {
    this.setState({ color: color.hex });
    this.props.handlePrimColor(color, str);
  };

  render() {
    return (
      <Fragment>
        <Modal
          visible={this.props.visible}
          title="Customisablity Settings"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              loading={this.props.loading}
              onClick={(e) => this.props.handleOk(this.state.layout, e)}
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
                              borderColor: "#04AED2",
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
                              borderColor: "#04AED2",
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
                              borderColor: "#04AED2",
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
                              borderColor: "#04AED2",
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
              <TabPane tab="Themes-Primary" key="2">
                <SketchPicker
                  disableAlpha
                  color={this.state.color}
                  onChangeComplete={(e) => this.handleChangeComplete(e, "Prim")}
                />
              </TabPane>
              <TabPane tab="Themes-Secondary" key="3">
                <SketchPicker
                  disableAlpha
                  color={this.state.color}
                  onChangeComplete={(e) => this.handleChangeComplete(e, "Sec")}
                />
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </Fragment>
    );
  }
}
export default Settings;
