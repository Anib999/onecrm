import React from 'react';
import PageHeader from '../common/pageHeader';
import { Form, Input, Button, Select, Col } from 'antd';
import AppButton from '../common/button/button';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CustomerAddressForm = (props) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <>
      <PageHeader
        title="Add a Customer"
        hasBreadcrumb
      />
      <Col span={16}>

        <Form form={form} name="control-hooks" >
          <Form.Item name="customer_code" label="Cutomer Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="internal_note" label="Internal Notes" >
            <TextArea />
          </Form.Item>

          <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              mode="multiple"
              mode="tags"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="male">china</Option>
              <Option value="female">phone cover</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <AppButton>
              Save
            </AppButton>
            <AppButton>
              Save and Add Address
            </AppButton>
          </Form.Item>
        </Form>
      </Col>
    </>
  )
}

export default CustomerAddressForm;