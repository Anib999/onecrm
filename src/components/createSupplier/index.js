import React from 'react';
import PageHeader from '../common/pageHeader';
import { Form, Input, Select, Col } from 'antd';
import AppButton from '../common/button/button';

const { Option } = Select;
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 18 },
  },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const CreateSupplierComponent = ({ forEdit, handleFinish, previousValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleFinish(values)
  }


  let prevVal = {
    ...previousValues,
    supSupplierTags: typeof previousValues?.supSupplierTags === 'string' ? previousValues?.supSupplierTags.split(',') : previousValues?.supSupplierTags
  }
  // console.log('previous ', prevVal)

  return (
    <>
      <PageHeader
        title={`${forEdit ? 'Edit' : 'Create New'} Supplier`}
        hasBreadcrumb
      />
      <Col span={16}>

        <Form
          {...formItemLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          colon={false}
          labelAlign="left"
          initialValues={prevVal}
        >
          <Form.Item
            name="supSupplierCode"
            label="Code"
            rules={[{ required: true, message: 'Supplier Code is required' }]}
          >
            <Input placeholder="Supplier Code" />
          </Form.Item>

          <Form.Item
            name="supSupplierName"
            label="Company Name"
            rules={[{ required: true, message: 'Supplier Name is required' }]}
          >
            <Input placeholder="Supplier Company name" />
          </Form.Item>

          <Form.Item
            name="supSupplierNotes"
            label="Internal Notes"
          // rules={[{ required: true, message: 'Internal Note is required' }]}
          >
            <TextArea placeholder="If any Internal notes" />
          </Form.Item>

          <Form.Item
            name="supSupplierTags"
            label="Tags"
          // rules={[{ required: true, message: 'Supplier tag is required' }]}
          >
            <Select
              placeholder="Enter/Select tags"
              mode="multiple"
              mode="tags"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="japan">japan</Option>
              <Option value="phone cover">phone cover</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item
            name="ContactPerson"
            label="Contact Person's Name"
            // rules={[{ required: true, message: 'Contact Person\'s Name is required' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="ContactPersonEmail"
            label="Contact Person's Email"
            // rules={[{ required: true, message: 'Contact Person\'s Email is required' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="ContactNumber"
            label="Contact Person's Phone"
            // rules={[{ required: true, message: 'Contact Person\'s Number is required' }]}
          >
            <Input placeholder="Phone" />
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <AppButton
              htmlType='submit'

            >
              {forEdit ? 'Update' : 'Create'}
            </AppButton>
          </Form.Item>
        </Form>
      </Col>
    </>
  )
}

export default CreateSupplierComponent;