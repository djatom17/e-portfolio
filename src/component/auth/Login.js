import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { Row, Form, Input, Button, Typography, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Title, Paragraph } = Typography;

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.error });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (text) => (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to="/my-profile" />;

    const onFinish = (values) => {
      const { email, password } = values;

      const user = {
        email,
        password,
      };
      // console.log("Received values of form: ", user);

      // Attempt to login
      this.props.login(user);
    };

    return (
      <div className={"login "}>
        <div className={"container"}>
          <div className={"row"}>
            <div className="col-mid-8 m-auto">
              <h1 className="display-4 text-center mt-5">Login</h1>
              <Paragraph className={"lead text-center"}>
                Log in and Start Flexing
              </Paragraph>

              <Form
                name="normal_login"
                className="login-form"
                size="large"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
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
                    onChange={this.handleChange("email")}
                  />
                </Form.Item>
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
                <div className="mt-5">
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                  <Row justify="center">
                    <GoogleButton />
                  </Row>
                  {this.state.msg && <Alert message={this.state.msg} type="error" className="mt-4"/>}
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
