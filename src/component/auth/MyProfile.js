import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class MyProfile extends Component {
    temp = {};

    componentDidMount() {
        // GET user profile 
        axios.get("/api/my-profile", 
        {
            headers: {
                "x-auth-token": this.props.token,

            }
        })
        //Returns profile fetched via GET into render
        .then((res) => {
            this.temp = res;
        });
    }

    //TODO return a layout template defined by user, populated by
    // user's data
    render() {
        console.log(this.temp);
        return null;
    }
}

const mapStateToProps = (state) => ({
    token : state.auth.token
  });

export default connect(mapStateToProps, {})(MyProfile);