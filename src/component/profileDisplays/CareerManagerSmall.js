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

export class CareerManagerSmall extends Component {
  state = {
    inputVisible: false,
    editInputIndex: -1,
  };

  constructor() {
    super();
    this.handleInputConfirm = ProfileData.handleInputConfirm.bind(this);
    this.handleCloseCard = ProfileData.handleCloseCard.bind(this);
    this.saveInputRef = ProfileData.saveInputRef.bind(this);
    this.saveEditInputRef = ProfileData.saveEditInputRef.bind(this);
  }

  trackEdit = (changedFields, allFields) => {
    this.setState({ inputValue: allFields });
  };

  // add new career card
  addCareerCard = (values) => {
    let data = this.props.data;
    console.log(data);
    if (values && data) {
      data = [...data, values];
    }
    this.setState({
      inputVisible: false,
    });
    this.props.changeList(data, "workHistory");
  };

  // edit existing career card
  editCareerCard = (values) => {
    let { editInputIndex } = this.state;

    let data = this.props.data;
    data[editInputIndex] = values;

    this.setState({
      editInputIndex: -1,
    });

    this.props.changeList(data, "workHistory");
  };

  render() {
    const { inputVisible, inputValue, editInputIndex, editValue } = this.state;

    return (
      <div>
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (
                this.props.isMyProfile &&
                this.props.canEdit &&
                editInputIndex === index
              ) {
                return (
                  // edit mode version of career card
                  <Card
                    style={{
                      width: this.props.mobileView ? "200px" : "300px",
                      marginTop: 16,
                      background: this.props.themeCol,
                    }}
                    hoverable={true}
                    bordered={false}
                    key={index}
                  >
                    <Form
                      name="add_career"
                      onValuesChange={this.trackEdit}
                      onFinish={this.editCareerCard}
                      initialValues={item}
                    >
                      <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                        <Form.Item
                          name="role"
                          label="Job title"
                          rules={[
                            {
                              required: true,
                              message: "Job title is required",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: this.props.mobileView ? "90px" : "auto",
                              textAlign: "center",
                            }}
                            placeholder="Job Title"
                          />
                        </Form.Item>

                        <Form.Item name="workplace" label="Workplace">
                          <Input
                            className="site-input-right"
                            style={{
                              width: this.props.mobileView ? "90px" : "auto",
                              textAlign: "center",
                            }}
                            placeholder="Company"
                          />
                        </Form.Item>
                      </Row>
                      <Row className="my-1">
                        <Form.Item
                          name="description"
                          style={{ width: "100%" }}
                          label="Description"
                        >
                          <Input.TextArea
                            showCount
                            maxLength={100}
                            placeholder="Add a description"
                          />
                        </Form.Item>
                      </Row>
                      <Row justify="space-around">
                        <Col>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              size="large"
                              type="link"
                              icon={<SaveOutlined />}
                            />
                          </Form.Item>
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
                    </Form>
                  </Card>
                );
              }

              // normal version of career card
              return (
                <Card
                  style={{
                    width: this.props.mobileView ? "200px" : "350px",

                    marginTop: 16,
                    background: this.props.themeCol,
                  }}
                  hoverable={true}
                  bordered={false}
                  key={index}
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
                    <Paragraph>This is a basic description</Paragraph>
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

          {inputVisible ? (
            // inputVisible: add new career card
            <Card
              style={{
                width: this.props.mobileView ? "200px" : "350px",
                marginTop: 16,
                background: this.props.themeCol,
              }}
              hoverable={true}
              bordered={false}
            >
              <Form
                name="add_career"
                onValuesChange={this.trackEdit}
                onFinish={this.addCareerCard}
              >
                <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                  <Form.Item
                    name="role"
                    label="Job Title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: this.props.mobileView ? "90px" : "auto",
                        textAlign: "center",
                      }}
                      placeholder="Job Title"
                    />
                  </Form.Item>

                  <Form.Item name="workplace" label="Workplace">
                    <Input
                      className="site-input-right"
                      style={{
                        width: this.props.mobileView ? "90px" : "auto",
                        textAlign: "center",
                      }}
                      placeholder="Company"
                    />
                  </Form.Item>
                </Row>
                <Row className="my-1">
                  <Form.Item
                    name="description"
                    style={{ width: "100%" }}
                    label="Description"
                  >
                    <Input.TextArea
                      showCount
                      maxLength={100}
                      placeholder="Add a description"
                    />
                  </Form.Item>
                </Row>
                <Row justify="space-around">
                  <Col>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        size="large"
                        type="link"
                        icon={<SaveOutlined />}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      type="link"
                      icon={<DeleteOutlined />}
                      onClick={() => this.setState({ inputVisible: false })}
                    />
                  </Col>
                </Row>
              </Form>
            </Card>
          ) : null}

          {!inputVisible && this.props.isMyProfile && this.props.canEdit ? (
            // add experience button
            <Card
              style={{
                width: this.props.mobileView ? "200px" : "350px",
                marginTop: 16,
                background: this.props.themeCol,
              }}
              hoverable={true}
              onClick={(e) => {
                this.setState({ inputVisible: true });
                e.preventDefault();
              }}
              bordered={false}
            >
              <Row justify="center" className="mt-5">
                <Col>
                  <Typography.Text
                    style={{
                      fontSize: "24px",
                      color: "#1890ff",
                      textAlign: "center",
                    }}
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

export default CareerManagerSmall;
