import React, { Component } from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

class SkillManager extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Received values of form:", values);
    };
    return (
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="skills">
          {/* {this.displaySkills(this.props.skills)} */}
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "skill"]}
                      fieldKey={[field.fieldKey, "skill"]}
                      rules={[
                        { required: true, message: "Missing first name" },
                      ]}
                    >
                      <Input placeholder="Skill" />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add Skill
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    );
  }
}

export default SkillManager;
