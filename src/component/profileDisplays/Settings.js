import React, { Component, Fragment } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Avatar,
  Input,
  Tabs,
  Select,
  Form,
} from "antd";
import { connect } from "react-redux";
import { showSettings, hideSettings } from "../../actions/profileActions";
import * as ProfileData from "../../api/ProfileData";
import "antd/dist/antd.css";

const { TabPane } = Tabs;
const { Option } = Select;

class Settings extends Component {
  state = {
    layout: "0",
    theme: "0",
    primaryColour: "",
    secondaryColour: "",
  };

  componentDidMount = () => {
    this.setState({
      layout: this.props.layout,
      primaryColour: this.props.primaryColour,
      secondaryColour: this.props.secondaryColour,
    });
  };

  trackEdit = (changedFields, allFields) => {
    this.setState({ inputValue: allFields });
  };

  // track dateChange
  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  handleOk = () => {
    const { layout, primaryColour, secondaryColour } = this.state;
    var addChange = {};
    this.props.hideSettings();
    if (layout) {
      addChange["layout"] = layout;
    }
    if (primaryColour) {
      addChange["primaryColour"] = primaryColour;
    }
    if (secondaryColour) {
      addChange["secondaryColour"] = secondaryColour;
    }

    if (addChange !== {}) {
      ProfileData.updateProfile(this.props.pid, addChange, this.props.token);
      window.location.reload();
    }
  };

  // handleCancel = () => {
  //   this.setState({ isVisible: false });
  // };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 10,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
      },
    };
    const { isVisible } = this.props;

    const profileOnFinish = (values) => {
      var addChange = {};
      const { linkToProfile, firstName, lastName } = values;
      if (linkToProfile) {
        addChange["linkToProfile"] = linkToProfile;
      }
      if (firstName) {
        addChange["firstName"] = firstName;
      }
      if (lastName) {
        addChange["lastName"] = lastName;
      }
      if (addChange !== {}) {
        console.log(addChange);
        ProfileData.updateProfile(this.props.pid, addChange, this.props.token);
      }
    };
    const accOnFinish = (values) => {
      var addChangePass = {};
      var addChangeEmail = {};
      const { email, password } = values;
      // Change details and check for empty
      if (email) {
        addChangeEmail["email"] = email;
        ProfileData.changeEmail(addChangeEmail, this.props.token);
      }
      if (password) {
        addChangePass["password"] = password;
        ProfileData.changePassword(addChangePass, this.props.token);
      }
    };
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
                <Row justify="space-between">
                  <Col>
                    <Select
                      defaultValue="0"
                      onSelect={ProfileData.themeCustom.bind(this)}
                    >
                      <Option value="0">Default</Option>
                      <Option value="1">Theme-1</Option>
                      <Option value="2"> Theme-2</Option>
                      <Option value="3"> Theme-3</Option>
                      <Option value="4"> Theme-4</Option>
                    </Select>
                  </Col>
                  <Col>
                    <Row>
                      <Col pull={1}>
                        <p>Primary Colour- </p>
                      </Col>
                      <Col
                        style={{
                          background: this.state.primaryColour,
                          borderStyle: "solid",
                          textAlign: "center",
                          height: 20,
                          width: 20,
                        }}
                      ></Col>
                    </Row>
                    <Row>
                      <Col pull={1}>
                        <p>Secondary Colour- </p>
                      </Col>
                      <Col
                        style={{
                          background: this.state.secondaryColour,
                          borderStyle: "solid",
                          textAlign: "center",
                          height: 20,
                          width: 20,
                        }}
                      ></Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="User Settings" key="3">
                <Row justify="space-between">
                  <Col>
                    <Form
                      {...formItemLayout}
                      id="User"
                      name="AccountSettings"
                      initialValues={{ email: this.props.user.email }}
                      onFinish={accOnFinish}
                    >
                      <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="New Password" name="password">
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (getFieldValue("password") === value) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                "The two passwords that you entered do not match!"
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Save Changes
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Profile Settings" key="4">
                <Row justify="space-between">
                  <Col>
                    <Form
                      {...formItemLayout}
                      id="Profile"
                      name="ProfileSettings"
                      initialValues={{
                        linkToProfile: this.props.linkToProfile.slice(
                          this.props.linkToProfile.lastIndexOf("/") + 1
                        ),
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                      }}
                      onFinish={profileOnFinish}
                    >
                      <Form.Item name="firstName" label="First Name">
                        <Input />
                      </Form.Item>
                      <Form.Item name="lastName" label="Last Name">
                        <Input />
                      </Form.Item>
                      <Form.Item name="linkToProfile" label="Custom URL">
                        <Input prefix="/" />
                      </Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Save Changes
                      </Button>
                    </Form>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { showSettings, hideSettings })(
  Settings
);
