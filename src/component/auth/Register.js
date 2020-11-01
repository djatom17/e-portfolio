import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Typography,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Paragraph } = Typography;

const Register = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 9,
      },
    },
  };

  // handle values submitted
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={"login body-height"}>
      <div className={"container"}>
        <div className={"row"}>
          <div className="col-mid-10 m-auto">
            <h1 className="display-4 text-center mt-5">Sign Up</h1>
            <Paragraph className={"lead text-center"}>
              Sign up for your very own e-portfolio!
            </Paragraph>

            <Form
              {...formItemLayout}
              name="register"
              onFinish={onFinish}
              size="large"
              colon={false}
            >
              {/* Email  */}
              <Form.Item
                name="email"
                label="Email  "
                rules={[
                  {
                    required: true,
                    message: "Please enter your Email!",
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
                label="Password "
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
                label="Confirm Password  "
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
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I consent to my data being displayed{" "}
                  <a href="https://e-port-folio.herokuapp.com/">here</a>.
                </Checkbox>
              </Form.Item>
              <div className="mt-5">
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Sign up
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
