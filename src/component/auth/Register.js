import React, { Component } from "react";
import { Form, Input, Row, Col, Checkbox, Button, Typography } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/authActions";

const { Paragraph } = Typography;

class Register extends Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to="/my-profile" />;

    // handle values submitted
    const onFinish = (values) => {
      const { name, email, password } = values;

      // Create user object
      const newUser = {
        name,
        email,
        password,
      };

      this.props.register(newUser);
    };

    return (
      <Row justify="center" align="middle">
        <Col>
          <h1 className="display-4 text-center mt-5">Sign Up</h1>
          <Paragraph className={"lead text-center"}>
            Sign up for your very own e-portfolio!
          </Paragraph>

          <Form name="register" onFinish={onFinish} size="large" colon={false}>
            {/* Name */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder=" Full Name"
              />
            </Form.Item>

            {/* Email  */}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder=" Email"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder=" Password"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
                visibilityToggle={false}
              />
            </Form.Item>

            {/* Consent agreement*/}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("We require your consent."),
                },
              ]}
            >
              <Checkbox>
                I consent to my data being displayed{" "}
                <a href="https://e-port-folio.herokuapp.com/">here</a>.
              </Checkbox>
            </Form.Item>
            <div className="my-3 ">
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mb-5"
                >
                  Sign up
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
