import React, { Component } from "react";
import { Row, Col, Card, Typography, Input, Divider, Button } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
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
    this.handleCloseTag = ProfileData.handleCloseTag.bind(this);
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

    const careerTitle = <h3>Job Title</h3>;
    const workPlace = <h3>WorkPlace</h3>;
    const careerDesc = (
      <Paragraph>ndkdlskdlskclxk c dojldksld ldksld</Paragraph>
    );

    const careerCard = (
      <Card style={{ width: 500, marginTop: 16 }} hoverable={true}>
        {" "}
        <Row>
          <Col>{careerTitle}</Col>
          <Col>
            <h3> @ </h3>
          </Col>
          <Col>{workPlace}</Col>
        </Row>
        <Row>{careerDesc}</Row>
        {this.props.isMyProfile && this.props.canEdit ? (
          <Row justify="space-around">
            <Divider />
            <Col>
              <Button size="small" type="link" icon={<EditOutlined />} />
            </Col>
            <Col>
              <Button size="small" type="link" icon={<DeleteOutlined />} />
            </Col>
          </Row>
        ) : null}
      </Card>
    );
    const careerCardEditing = (
      <Card style={{ width: "auto", marginTop: 16 }} hoverable={true}>
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
          <Input.TextArea showCount maxLength={100} />
        </Row>

        <Row justify="space-around">
          <Col>
            <Button size="small" type="link" icon={<SaveOutlined />} />
          </Col>
          <Col>
            <Button size="small" type="link" icon={<DeleteOutlined />} />
          </Col>
        </Row>
      </Card>
    );

    return (
      <div>
        {careerCardEditing}
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return careerCardEditing;
              }
              if (this.props.isMyProfile && this.props.canEdit) {
              }
              return careerCard;
            })}
        </Row>
      </div>
    );
  }
}

export default CareerManager;
