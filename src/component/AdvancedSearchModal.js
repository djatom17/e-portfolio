import { Form, Input, Modal, Button } from "antd";
import React, { Component } from "react";

class AdvancedSearchModal extends Component {
  formRef = React.createRef();

  onSearch = (values) => {
    var searchParams = new URLSearchParams("");
    if (values.name.length > 0)
      searchParams.set("name", encodeURIComponent(values.name));
    if (values.skills.length > 0)
      searchParams.set("skills", encodeURIComponent(values.skills));
    this.props.handleSearch(searchParams);
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  };

  handleCancel = () => {
    this.props.onCancel();
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <Modal
        title="Advanced Search Options"
        centered
        visible={this.props.view}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="advancedSearch"
          >
            Search
          </Button>,
        ]}
      >
        <Form
          id="advancedSearch"
          layout="vertical"
          onFinish={this.onSearch}
          initialValues={{ name: "", skills: "" }}
          ref={this.formRef}
        >
          <Form.Item
            name="name"
            label={<strong>Who are you looking for?</strong>}
          >
            <Input placeholder="Enter a name" />
          </Form.Item>
          <Form.Item
            name="skills"
            label={<strong>What skills are you looking for?</strong>}
          >
            <Input placeholder="Enter some skills" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AdvancedSearchModal;
