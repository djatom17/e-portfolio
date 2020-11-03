import React, { Component, Fragment } from "react";
import { Button, Row, Col, Typography, Input, Tag, Tooltip } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

const { Title, Paragraph } = Typography;

export class ContactDetails extends Component {
  state = {
    email: "",
    phone: "",
    address: "",
    editing: "",
    editInputValue: "",
  };

  constructor() {
    super();
    this.handleEditInputChange = ProfileData.handleEditInputChange.bind(this);
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

  // save changes to db
  saveChanges = () => {
    const { editing, editInputValue } = this.state;
    if (editing === "email") {
      this.setState({ email: editInputValue });
      this.props.changeObj("contact", "email", editInputValue, this.props.data);
    }
    if (editing === "phone") {
      this.setState({ phone: editInputValue });
      this.props.changeObj("contact", "phone", editInputValue, this.props.data);
    }
    if (editing === "address") {
      this.setState({ address: editInputValue });
      this.props.changeObj(
        "contact",
        "address",
        editInputValue,
        this.props.data
      );
    }
    // var newContact = {
    //   email: this.state.email,
    //   phone: this.state.phone,
    //   address: this.state.address,
    // };

    this.setState({ editing: "", editInputValue: "" });
    // this.props.changeObj("contact", newContact);
  };

  render() {
    const { editing } = this.state;
    if (this.props.canEdit) {
      return (
        <div>
          <Typography style={{ fontSize: "24px" }}>
            <Row gutter={16}>
              <Col>Email: </Col>
              <Col>
                {editing === "email" ? (
                  <Input
                    value={this.state.editInputValue}
                    ref={(input) => input && input.focus()}
                    onChange={this.handleEditInputChange}
                    onPressEnter={() => this.saveChanges()}
                  />
                ) : (
                  <Paragraph>{this.state.email}</Paragraph>
                )}
              </Col>
              <Col>
                {editing === "email" ? null : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() =>
                      this.setState({
                        editing: "email",
                        editInputValue: this.state.email,
                      })
                    }
                  />
                )}
              </Col>
            </Row>
            <Row gutter={16}>
              {" "}
              <Col>Phone: </Col>{" "}
              <Col>
                {editing === "phone" ? (
                  <Input
                    value={this.state.editInputValue}
                    ref={(input) => input && input.focus()}
                    onChange={this.handleEditInputChange}
                    onPressEnter={() => this.saveChanges()}
                  />
                ) : (
                  <Paragraph>{this.state.phone}</Paragraph>
                )}
              </Col>
              <Col>
                {editing === "phone" ? null : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() =>
                      this.setState({
                        editing: "phone",
                        editInputValue: this.state.phone,
                      })
                    }
                  />
                )}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>Address: </Col>
              <Col>
                {editing === "address" ? (
                  <Input
                    value={this.state.editInputValue}
                    ref={(input) => input && input.focus()}
                    onChange={this.handleEditInputChange}
                    onPressEnter={() => this.saveChanges()}
                  />
                ) : (
                  <Paragraph>{this.state.address}</Paragraph>
                )}
              </Col>
              <Col>
                {editing === "address" ? null : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() =>
                      this.setState({
                        editing: "address",
                        editInputValue: this.state.address,
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          </Typography>
        </div>
      );
    }
    return (
      <div>
        <Typography style={{ fontSize: "24px" }}>
          <Row gutter={16}>
            <Col>Email: </Col>
            <Col>
              <Paragraph>{this.state.email}</Paragraph>
            </Col>
          </Row>
          <Row gutter={16}>
            {" "}
            <Col>Phone: </Col>{" "}
            <Col>
              <Paragraph>{this.state.phone}</Paragraph>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>Address: </Col>
            <Col>
              <Paragraph>{this.state.address}</Paragraph>
            </Col>
          </Row>
        </Typography>
      </div>
    );
  }
}

export default ContactDetails;
