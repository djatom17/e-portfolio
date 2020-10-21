import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../../actions/authActions";

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
        clientId={CLIENT_ID}
        buttonText="Sign in with Google"
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
