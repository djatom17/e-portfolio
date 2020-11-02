import React, { Component } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";
import { Row, Col, Card, Typography, Input, Divider, Button, Form } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";
import DragUpload from "./DragUpload";
import { Hidden } from "@material-ui/core";
// import Title from "antd/lib/skeleton/Title";

const { Paragraph, Title } = Typography;

export class ProjectManager extends Component {
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

  // add new Project card
  addProjectCard = (values) => {
    let data = this.props.data;
    console.log(data);
    if (values && data) {
      data = [...data, values];
    }
    this.setState({
      inputVisible: false,
    });
    this.props.changeList(data, this.props.type);
  };

  // edit existing Project card
  editProjectCard = (values) => {
    let { editInputIndex } = this.state;

    let data = this.props.data;
    data[editInputIndex] = { ...data[editInputIndex], ...values };

    this.setState({
      editInputIndex: -1,
    });

    this.props.changeList(data, this.props.type);
  };

  render() {
    const { inputVisible, inputValue, editInputIndex, editValue } = this.state;

    return (
      <div>
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              console.log(this.props.data);
              if (
                this.props.isMyProfile &&
                this.props.canEdit &&
                editInputIndex === index
              ) {
                return (
                  // edit mode version of Project card
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
                    <Form
                      name="add_project"
                      onValuesChange={this.trackEdit}
                      onFinish={this.editProjectCard}
                      initialValues={item}
                    >
                      <Row style={{ overflow: Hidden, whiteSpace: "nowrap" }}>
                        <Form.Item
                          name="name"
                          label="Project Name"
                          rules={[
                            {
                              required: true,
                              message: "Name is required",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: this.props.mobileView ? "90px" : "auto",
                              textAlign: "center",
                            }}
                            placeholder="Project Name"
                          />
                        </Form.Item>
                      </Row>
                      <Row className="my-1">
                        <Form.Item
                          name="description"
                          style={{ width: "100%" }}
                          label="Project Description"
                        >
                          <Input.TextArea
                            showCount
                            placeholder="Add a description"
                          />
                        </Form.Item>
                      </Row>
                      <Row justify="space-around">
                        <Col>
                          <Form.Item name="url">
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
                              this.handleCloseCard(
                                this.props.type,
                                item,
                                "role"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                );
              }

              // normal version of Project card
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
                      <Title className="h9size">{item.name}</Title>
                    </Col>
                  </Row>
                  <Row>
                    <Paragraph className="psize">{item.description}</Paragraph>
                  </Row>
                  <Row>
                    {item.url && (
                      <Button
                        type="link"
                        onClick={() =>
                          ProfileData.getFileDownload(
                            item.filename,
                            ProfileData.getFileLink(item.url)
                          )
                        }
                      >
                        {console.log(item.filename)}
                        <PaperClipOutlined />
                        {item.name}
                      </Button>
                    )}
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
                            this.handleCloseCard(this.props.type, item, "name")
                          }
                        />
                      </Col>
                    </Row>
                  ) : null}
                </Card>
              );
            })}

          {/* {inputVisible ? (
            // inputVisible: add new Upload card
            <DragUpload
              onChange={
                this.props.type === "filesAndDocs"
                  ? ProfileData.onProjectsChange.bind(this)
                  : ProfileData.onCertificatesChange.bind(this)
              }
            />
          ) : null} */}
        </Row>
      </div>
    );
  }
}

export default ProjectManager;
