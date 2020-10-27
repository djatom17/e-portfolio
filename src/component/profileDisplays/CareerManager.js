import React, { Component } from "react";
import { Row, Col, Card, Typography, Input, Divider, Button, Form } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";
import { Hidden } from "@material-ui/core";

const { Paragraph } = Typography;
const { Item } = Form;

export class CareerManager extends Component {
  state = {
    inputVisible: false,
    inputValues: {},
    inputValue1: "", // Role
    inputValue2: "", // WorkPlace
    inputValue3: "", // Description
    editInputIndex: -1,
    editInputValue: "",
  };

  constructor() {
    super();
    this.handleInputChangeRole = ProfileData.handleInputChange1.bind(this);
    this.handleInputChangePlace = ProfileData.handleInputChange2.bind(this);
    this.handleInputChangeDesc = ProfileData.handleInputChange3.bind(this);
    this.handleCloseCard = ProfileData.handleCloseCard.bind(this);
    this.handleAddCard = ProfileData.handleAddCard.bind(this);
  }

  render() {
    const {
      inputVisible,
      inputValue1,
      inputValue2,
      inputValue3,
      editInputIndex,
      editInputValue,
    } = this.state;

    return (
      <div>
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return (
                  // career card in edit mode
                  <Card
                    style={{ width: "auto", minWidth500, marginTop: 16 }}
                    hoverable={true}
                  >
                    <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                      <Input.Group compact>
                        <Input
                          style={{ width: 230, textAlign: "center" }}
                          placeholder="Job Title"
                          value={item.role}
                        />{" "}
                        <Input
                          className="site-input-split"
                          style={{
                            width: 40,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: "none",
                          }}
                          placeholder="@"
                          disabled
                        />
                        <Input
                          className="site-input-right"
                          style={{
                            width: 230,
                            textAlign: "center",
                          }}
                          placeholder="Company"
                          value={item.workplace}
                        />
                      </Input.Group>
                    </Row>
                    <Row className="my-1">
                      <Input.TextArea
                        showCount
                        maxLength={100}
                        value="add descriptioon"
                      />
                    </Row>
                    <Row justify="space-around">
                      <Col>
                        <Button
                          size="large"
                          type="link"
                          icon={<SaveOutlined />}
                        />
                      </Col>
                      <Col>
                        <Button
                          size="large"
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            this.handleCloseCard("workHistory", item, "role")
                          }
                        />
                      </Col>
                    </Row>
                  </Card>
                );
              }

              // normal version of career card
              return (
                <Card
                  style={{ width: "auto", minWidth: 500, marginTop: 16 }}
                  hoverable={true}
                >
                  {" "}
                  <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                    <Col>
                      <h4>{item.role}</h4>
                    </Col>
                    <Col>
                      <h4> @ </h4>
                    </Col>
                    <Col>
                      <h4>{item.workplace}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Paragraph>add descriptiooon</Paragraph>
                  </Row>
                  {this.props.isMyProfile && this.props.canEdit ? (
                    <Row justify="space-around">
                      <Divider />
                      <Col>
                        <Button
                          size="large"
                          type="link"
                          icon={<EditOutlined />}
                          onClick={
                            // handle edit click
                            this.props.isMyProfile && this.props.canEdit
                              ? (e) => {
                                  this.setState({
                                    editInputIndex: index,
                                    editInputValue: item,
                                  });
                                  e.preventDefault();
                                }
                              : null
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          size="large"
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            this.handleCloseCard("workHistory", item, "role")
                          }
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Card>
              );
            })}

          {inputVisible && (
            // inputVisible: add new career card
            <Card
              style={{ width: "auto", minWidth: 500, marginTop: 16 }}
              hoverable={true}
            >
              <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                <Input.Group compact>
                  <Input
                    style={{ width: 230, textAlign: "center" }}
                    placeholder="Job Title"
                    value={inputValue1}
                    onChange={this.handleInputChangeRole}
                  />{" "}
                  <Input
                    className="site-input-split"
                    style={{
                      width: 40,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: "none",
                    }}
                    placeholder="@"
                    disabled
                  />
                  <Input
                    className="site-input-right"
                    style={{
                      width: 230,
                      textAlign: "center",
                    }}
                    placeholder="Company"
                    value={inputValue2}
                    onChange={this.handleInputChangePlace}
                  />
                </Input.Group>
              </Row>
              <Row className="my-1">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  placeholder="Add a description"
                  value={inputValue3}
                  onChange={this.handleInputChangeDesc}
                />
              </Row>
              <Row justify="space-around">
                <Col>
                  <Button
                    size="large"
                    type="link"
                    icon={<SaveOutlined />}
                    onClick={() =>
                      this.handleAddCard("workHistory", [
                        "role",
                        "workplace",
                        "from",
                      ])
                    }
                  />
                </Col>
                <Col>
                  <Button
                    size="large"
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      this.handleCloseCard("workHistory", item, "role")
                    }
                  />
                </Col>
              </Row>
            </Card>
          )}

          {!inputVisible && this.props.isMyProfile && this.props.canEdit ? (
            // add experience button
            <Card
              style={{ width: 500, marginTop: 16 }}
              hoverable={true}
              onClick={(e) => {
                this.setState({ inputVisible: true });
                e.preventDefault();
              }}
            >
              <Row justify="center" class="mt-5">
                <Col>
                  <Typography.Text
                    style={{ fontSize: "28px", color: "#1890ff" }}
                    type="secondary"
                  >
                    Add Experience
                  </Typography.Text>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Typography.Text
                    style={{ fontSize: "20px", color: "#1890ff" }}
                    type="secondary"
                  >
                    {" "}
                    <PlusOutlined />
                  </Typography.Text>
                </Col>
              </Row>

              <Row justify="center" align="stretch"></Row>
            </Card>
          ) : null}
        </Row>
      </div>
    );
  }
}

export default CareerManager;
