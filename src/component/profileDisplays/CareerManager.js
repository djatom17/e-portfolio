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
    inputValue: {},
    editInputIndex: -1,
    editValue: {},
  };

  constructor() {
    super();
    this.handleInputConfirm = ProfileData.handleInputConfirm.bind(this);
    this.handleCloseCard = ProfileData.handleCloseCard.bind(this);
    this.handleEditCard = ProfileData.handleEditCard.bind(this);
    this.saveInputRef = ProfileData.saveInputRef.bind(this);
    this.saveEditInputRef = ProfileData.saveEditInputRef.bind(this);
  }

  trackEdit = (changedFields, allFields) => {
    console.log(allFields);
    this.setState({ inputValue: allFields });
  };

  render() {
    const { inputVisible, inputValue, editInputIndex, editValue } = this.state;

    return (
      <div>
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return (
                  // edit mode version of career card
                  <Card
                    style={{ width: "auto", marginTop: 16 }}
                    hoverable={true}
                  >
                    <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                      <Input.Group compact>
                        <Input
                          style={{ width: 230, textAlign: "center" }}
                          placeholder="Job Title"
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
                        />
                      </Input.Group>
                    </Row>
                    <Row className="my-1">
                      <Input.TextArea
                        showCount
                        maxLength={100}
                        // save when enter on the last field
                        onPressEnter={() =>
                          this.handleEditCard("workHistory", [
                            "role",
                            "workplace",
                            "from",
                          ])
                        }
                      />
                    </Row>
                    <Row justify="space-around">
                      <Col>
                        <Button
                          size="large"
                          type="link"
                          icon={<SaveOutlined />}
                          onClick={() =>
                            this.handleEditCard("workHistory", [
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
                                    inputVisible: false,
                                    editValue: item,
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
              <Form
                name="add_career"
                onValuesChange={this.trackEdit}
                onFinish={this.handleInputConfirm("workHistory")}
              >
                <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                  <Input.Group compact>
                    <Item name="role">
                      <Input
                        style={{ width: 230, textAlign: "center" }}
                        placeholder="Job Title"
                      />{" "}
                    </Item>

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
                    <Item name="workplace">
                      <Input
                        className="site-input-right"
                        style={{
                          width: 230,
                          textAlign: "center",
                        }}
                        placeholder="Company"
                      />
                    </Item>
                  </Input.Group>
                </Row>
                <Row className="my-1">
                  <Item name="description">
                    <Input.TextArea
                      showCount
                      maxLength={100}
                      placeholder="Add a description"
                    />
                  </Item>
                </Row>
                <Row justify="space-around">
                  <Col>
                    <Item>
                      <Button
                        htmlType="submit"
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
                    </Item>
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      type="link"
                      icon={<DeleteOutlined />}
                    />
                  </Col>
                </Row>
              </Form>
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
