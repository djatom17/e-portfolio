import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../../actions/authActions";
import {
  GoogleOutlined,
  GoogleSquareFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css";

const CLIENT_ID =
  "84279213789-nla6f8u88716cs7t53iikugg977laq92.apps.googleusercontent.com";

class GoogleButton extends Component {
  state = {
    isGoogleAuth: false,
    googleAccessToken: "",
  };

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLoginSuccess(response) {
    this.props.googleLogin(response);
  }

  handleLoginSuccess = this.handleLoginSuccess.bind(this);

  render() {
    return (
      <GoogleLogin
        render={(renderProps) => (
          <Button
            block
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <GoogleOutlined
              style={{ fontSize: "20px", position: "relative", bottom: "4px" }}
            />
            Sign in with Google
          </Button>
        )}
        clientId={CLIENT_ID}
        buttonText="     Sign in with Google     "
        onSuccess={this.handleLoginSuccess}
        onFailure={this.handleLoginFailure}
        cookiePolicy={"single_host_origin"}
        responseType="code,token"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { googleLogin })(GoogleButton);
