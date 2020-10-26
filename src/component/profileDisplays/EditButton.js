import React, { Component, Fragment } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import * as ProfileData from "../../api/ProfileData";
import axios from "axios";
import { connect } from "react-redux";

export class EditButton extends Component {
  state = {
    profileChanges: this.props.profileChanges,
  };

  handlePFPUpload = (changes) => {
    return new Promise((resolve, reject) => {
      if ("image" in changes) {
        // Step 1: Upload the file.
        const formData = new FormData();
        // formData.append("file", new File([changes.image], "file"));
        formData.append("file", changes.image);
        axios
          .post("/api/file/upload", formData, {
            headers: {
              "x-auth-token": this.props.token,
              "x-pfp-upload": "true",
              "Content-Type": "multipart/form-data",
            },
          })
          // Step 2: Change the image key in profileChanges to the link returned.
          .then((response) => {
            if (response.data.error) {
              console.log(
                "Major error while uploading profile picture. Try again."
              );
              reject();
            } else {
              resolve(response.data.fileUrl);
            }
          });
      } else {
        reject();
      }
    });
  };

  handleEditButtonClick = () => {
    var { profileChanges } = this.state;

    this.handlePFPUpload(profileChanges)
      .then((pfpUrl) => {
        profileChanges.image = pfpUrl;
      })
      .catch(() => delete profileChanges.image)
      .finally(() => {
        // Make changes reflect in the database.
        ProfileData.updateProfile(
          this.props._id,
          profileChanges,
          this.props.token
        );

        // Revert state of being able to edit the profile.
        this.props.changeEdit();
      });
  };

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.profileChanges !== prevState.profileChanges) {
      return { profileChanges: newProps.profileChanges };
    }
    return {};
  }

  render() {
    return (
      <Fragment>
        {this.props.isMyProfile ? (
          <Button
            type="primary"
            data-toggle="collapse"
            data-target="#mobile-nav"
            onClick={this.handleEditButtonClick}
          >
            {this.props.canEdit ? "Done" : "Edit"}
          </Button>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(EditButton);
