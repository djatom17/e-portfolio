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
  }

  trackEdit = (changedFields, allFields) => {
    this.setState({ inputValue: allFields });
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
    const { inputVisible, inputValue, editInputIndex, editValue } = this.state;

    return (
      <div>
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return (
                  // edit mode version of education card
                  <Card
                    style={{ width: "auto", marginTop: 16 }}
                    hoverable={true}
                  >
                    <Form
                      name="add_degree"
                      onValuesChange={this.trackEdit}
                      onFinish={this.editEducationCard}
                      initialValues={item}
                    >
                      <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                        <Form.Item
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Course name is required",
                            },
                          ]}
                        >
                          <Input
                            style={{ width: 500, textAlign: "center" }}
                            placeholder="Course Name"
                          />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item name="institution" label="Institution">
                          <Input
                            style={{
                              width: 230,
                              textAlign: "center",
                            }}
                            placeholder="Institution"
                          />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item name="level" label="Level">
                          <Input
                            style={{
                              width: 230,
                              textAlign: "center",
                            }}
                            placeholder="Level"
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
                              this.handleCloseCard("education", item, "role")
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
                  style={{ width: "auto", minWidth: 500, marginTop: 16 }}
                  hoverable={true}
                >
                  {" "}
                  <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                    <Col>
                      <h4>{item.name}</h4>
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
                            this.handleCloseCard("education", item, "role")
                          }
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Card>
              );
            })}

          {inputVisible ? (
            // inputVisible: add new education card
            <Card
              style={{ width: "auto", minWidth: 500, marginTop: 16 }}
              hoverable={true}
            >
              <Form
                name="add_degree"
                onValuesChange={this.trackEdit}
                onFinish={this.addEducationCard}
                initialValues={item}
              >
                <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Course name is required",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: 500, textAlign: "center" }}
                      placeholder="Course Name"
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item name="institution" label="Institution">
                    <Input
                      style={{
                        width: 230,
                        textAlign: "center",
                      }}
                      placeholder="Institution"
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item name="level" label="Level">
                    <Input
                      style={{
                        width: 230,
                        textAlign: "center",
                      }}
                      placeholder="Level"
                    />
                  </Form.Item>
                </Row>
              </Form>
            </Card>
          ) : null}

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

export default EducationManager;
