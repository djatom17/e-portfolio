import React, { Component } from "react";
import { Row, Col, Card, Typography, Input, Divider, Button } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";
import { Hidden } from "@material-ui/core";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export class CareerManager extends Component {
  state = {
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  constructor() {
    super();
    this.handleInputChange = ProfileData.handleInputChange.bind(this);
    this.handleEditInputChange = ProfileData.handleEditInputChange.bind(this);
    this.handleInputConfirm = ProfileData.handleInputConfirm.bind(this);
    this.handleCloseCard = ProfileData.handleCloseCard.bind(this);
    this.handleEditInputConfirm = ProfileData.handleEditInputConfirm.bind(this);
    this.saveInputRef = ProfileData.saveInputRef.bind(this);
    this.saveEditInputRef = ProfileData.saveEditInputRef.bind(this);
    this.deleteButt = ProfileData.deleteButt.bind(this);
  }

  render() {
    const {
      inputVisible,
      inputValue,
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
                          placeholder="Job Title"
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
            // inputVisible to add new career
            <Card
              style={{ width: "auto", minWidth: 500, marginTop: 16 }}
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
                    placeholder="Job Title"
                  />
                </Input.Group>
              </Row>
              <Row className="my-1">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  placeholder="Add a description"
                />
              </Row>
              <Row justify="space-around">
                <Col>
                  <Button size="large" type="link" icon={<SaveOutlined />} />
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
