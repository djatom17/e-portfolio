import React, { Component, Fragment } from "react";
import { Button, Row, Col, Typography, Input, Tag, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

const { Title, Paragraph } = Typography;

export class ContactDetails extends Component {
  state = {
    email: "",
    phone: "",
    address: "",
  };

  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.data) {
      if (this.props.data.email) {
        this.setState({ email: this.props.data.email });
      }

      if (this.props.data.phone) {
        this.setState({ phone: this.props.data.phone });
      }

      if (this.props.data.address) {
        this.setState({ address: this.props.data.address });
      }
    }
  }

  // setEmail
  setEmail = (str) => {
    this.setState({ email: str });
    console.log(this.state.email);
  };

  // setPhone
  setPhone = (str) => {
    this.setState({ phone: str });
  };

  // setAddress
  setAddress = (str) => {
    this.setState({ address: str });
  };

  // save changes to database
  saveChanges = () => {
    // set outer objects
    var newContact = {
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    };

    this.props.changeObj("contact", newContact);
  };

  render() {
    return (
      <div>
        <Typography style={{ fontSize: "24px" }}>
          <Row gutter={16}>
            <Col>Email: </Col>
            <Col>
              <Paragraph
                editable={
                  this.props.canEdit
                    ? {
                        onChange: (str) => {
                          this.setEmail(str);
                          this.saveChanges();
                        },
                      }
                    : false
                }
              >
                {this.state.email}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={16}>
            {" "}
            <Col>Phone: </Col>{" "}
            <Col>
              <Paragraph
                editable={
                  this.props.canEdit
                    ? {
                        onChange: (str) => {
                          this.setPhone(str);
                          this.saveChanges();
                        },
                      }
                    : false
                }
              >
                {this.state.phone}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>Address: </Col>
            <Col>
              <Paragraph
                editable={
                  this.props.canEdit
                    ? {
                        onChange: (str) => {
                          this.setAddress(str);
                          this.saveChanges();
                        },
                      }
                    : false
                }
              >
                {this.state.address}
              </Paragraph>
            </Col>
          </Row>
        </Typography>
      </div>
    );
  }
}

export default ContactDetails;
