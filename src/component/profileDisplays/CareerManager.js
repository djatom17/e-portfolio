import React, { Component } from "react";
import { Row, Col, Card, Typography, Input } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as ProfileData from "../../api/ProfileData";

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
    const careerTitleEditable = <Input />;

    const workPlace = <h3>WorkPlace</h3>;
    const workPlaceEditable = <Input />;

    const careerDesc = (
      <Paragraph>ndkdlskdlskclxk c dojldksld ldksld</Paragraph>
    );
    const careerDescEditable = <Input.TextArea />;

    const careerCard = (
      <Card style={{ width: 400, marginTop: 16 }} hoverable={true}>
        {" "}
        <Row>
          <Col>
            {this.props.isMyProfile && this.props.canEdit
              ? careerTitleEditable
              : careerTitle}
          </Col>
          <Col>
            <h3> @ </h3>
          </Col>
          <Col>
            {this.props.isMyProfile && this.props.canEdit
              ? workPlaceEditable
              : workPlace}
          </Col>
        </Row>
      </Card>
    );
    const careerCardLoggedIn = <Card></Card>;
    const careerCardEditing = <Card></Card>;

    return (
      <div>
        <Title>Career</Title>
        {careerCard}
        <Row>
          {this.props.data &&
            this.props.data.map((item, index) => {
              if (editInputIndex === index) {
                return careerCardEditing;
              }
              if (this.props.isMyProfile) {
                if (this.props.canEdit) {
                  return careerCardEditing;
                }
                return careerCardLoggedIn;
              }
              return careerCard;
            })}
        </Row>
      </div>
    );
  }
}

export default CareerManager;
