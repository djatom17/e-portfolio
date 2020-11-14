import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Divider,
  Button,
  Form,
  DatePicker,
} from "antd";
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

export class EducationManager extends Component {
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
    this.formatDate = ProfileData.formatDate.bind(this);
  }

  trackEdit = (changedFields, allFields) => {
    this.setState({ inputValue: allFields });
  };

  // track dateChange
  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  // add new education card
  addEducationCard = (values) => {
    let data = this.props.data;
    console.log(data);
    if (values && data) {
      data = [...data, values];
    }
    this.setState({
      inputVisible: false,
    });
    this.props.changeList(data, "education");
  };

  // edit existing education card
  editEducationCard = (values) => {
    let { editInputIndex } = this.state;

    let data = this.props.data;
    data[editInputIndex] = values;

    this.setState({
      editInputIndex: -1,
    });

    this.props.changeList(data, "education");
  };

  render() {
    // moment
    var moment = require("moment");

    // form layouts
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

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
                  // edit mode version of education card
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
                    <Form
                      name="edit_degree"
                      onValuesChange={this.trackEdit}
                      onFinish={this.editEducationCard}
                      initialValues={this.formatDate(item, "to", "to")}
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                    >
                      <Form.Item
                        name="name"
                        label="Qualification"
                        rules={[
                          {
                            required: true,
                            message: "Course name is required",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: this.props.mobileView ? "90px" : "auto",
                            textAlign: "center",
                            maxWidth: "150px",
                          }}
                          placeholder="Course Name"
                        />
                      </Form.Item>
                      <Form.Item name="to" label="Completed">
                        <DatePicker
                          onChange={this.onChangeDate}
                          picker="month"
                        />
                      </Form.Item>

                      <Form.Item name="institution" label="Institution">
                        <Input
                          style={{
                            width: this.props.mobileView ? "90px" : "auto",
                            textAlign: "center",
                          }}
                          placeholder="Institution"
                        />
                      </Form.Item>
                      <Form.Item name="level" label="Level">
                        <Input
                          style={{
                            width: this.props.mobileView ? "90px" : "auto",
                            textAlign: "center",
                          }}
                          placeholder="Level"
                        />
                      </Form.Item>
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
                              this.handleCloseCard("education", item, "name")
                            }
                          />
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                );
              }

              // normal version of education card
              return (
                <Card
                  style={{
                    width: this.props.mobileView ? "200px" : "500px",
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
                      <h4>{item.name}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>{moment(item.to).format("M-YYYY")}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Paragraph>Institution: {item.institution}</Paragraph>
                  </Row>
                  <Row>
                    <Paragraph>Level: {item.level}</Paragraph>
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
                            this.handleCloseCard("education", item, "name")
                          }
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Card>
              );
            })}

          {this.props.isMyProfile && this.props.canEdit && inputVisible ? (
            // inputVisible: add new education card
            <Card
              style={{
                width: this.props.mobileView ? "200px" : "500px",

                marginTop: 16,
                background: this.props.themeCol,
              }}
              hoverable={true}
              bordered={false}
            >
              <Form
                name="add_degree"
                onFinish={this.addEducationCard}
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                <Form.Item
                  name="name"
                  label="Qualification"
                  rules={[
                    {
                      required: true,
                      message: "Course name is required",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: this.props.mobileView ? "90px" : "auto",
                      textAlign: "center",
                    }}
                    placeholder="Course Name"
                  />
                </Form.Item>

                <Form.Item name="to" label="Completed">
                  <DatePicker onChange={this.onChangeDate} picker="month" />
                </Form.Item>

                <Form.Item name="institution" label="Institution">
                  <Input
                    style={{
                      width: this.props.mobileView ? "90px" : "auto",
                      textAlign: "center",
                    }}
                    placeholder="Institution"
                  />
                </Form.Item>

                <Form.Item name="level" label="Level">
                  <Input
                    style={{
                      width: this.props.mobileView ? "90px" : "auto",
                      textAlign: "center",
                    }}
                    placeholder="Level"
                  />
                </Form.Item>
                <Divider />
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
            // add qualification button
            <Card
              style={{
                width: this.props.mobileView ? "200px" : "500px",
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
                    Add Qualification
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

export default EducationManager;
