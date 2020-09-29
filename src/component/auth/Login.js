import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router-dom";

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
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
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
    const { error, isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to="/my-profile" />;

    return (
      <div className={"login"}>
        <div className={"container"}>
          <div className={"row"}>
            <div className="col-mid-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className={"lead text-center"}>Log in and Start Flexing</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type={"email"}
                    className={"form-control form-control-lg"}
                    placeholder="Email"
                    name={"email"}
                    // value={email}
                    onChange={this.handleChange("email")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type={"password"}
                    className={"form-control form-control-lg"}
                    placeholder="password"
                    name={"password"}
                    // value={password}
                    onChange={this.handleChange("password")}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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
