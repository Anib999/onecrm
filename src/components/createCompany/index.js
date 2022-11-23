import React from 'react'
import PageHeader from '../common/pageHeader';
import { Form, Input, Select, Col } from 'antd';
import AppButton from '../common/button/button';

// const { TextArea } = Input;
const { Option } = Select;

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
const CreateCompanyComponent = ({ forEdit, handleFinish, previousValues }) => {
  const [form] = Form.useForm();
  // console.log(previousValues)
  const onFinish = (values) => {
    handleFinish(values);
  }


  return (
    <>
      <PageHeader
        title={`${forEdit ? 'Edit' : 'Add new '} Company`}
        hasBreadcrumb
      />
      <Col span={16}>

        <Form
          {...formItemLayout}
          form={form} name="control-hooks"
          onFinish={onFinish}
          colon={false}
          labelAlign="left"
          initialValues={previousValues}
        >
          <Form.Item
            name="CompanyName"
            label="Company Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>

          {/* <Form.Item
            name="CompanyRegNo"
            label="Registration No."
            // rules={[{ required: true }]}
          >
            <Input placeholder="Company Reg. No." />
          </Form.Item> */}

          <Form.Item
            name="AddressName"
            label="Address Name"
          >
            <Input placeholder="Address Name" />
          </Form.Item>

          <Form.Item
            name="PostalCode"
            label="Postal Code"
          >
            <Input placeholder="Postal Code" />
          </Form.Item>

          <Form.Item
            name="City"
            label="City"
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            name="ComapanyAddress"
            label="Address 1"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company Address" />
          </Form.Item>

          {/* new added */}
          <Form.Item
            name="CompanyAddress2"
            label="Address 2"
            rules={[{ required: true }]}
            // for now required as empty data is not parsed
          >
            <Input placeholder="Company Address 2" />
          </Form.Item>
          {/* new added */}

          <Form.Item
            name="CompanyContact"
            label="Contact"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company Contact" />
          </Form.Item>
          <Form.Item
            name="CompanyEmail"
            label="Email"
            // rules={[{ required: true }]}
          >
            <Input placeholder="Company Email" />
          </Form.Item>


          <Form.Item {...tailLayout} >
            <AppButton
              htmlType='submit'
            >
              {forEdit ? 'Update' : 'Add'}
            </AppButton>
          </Form.Item>
        </Form>
      </Col>
    </>
  )
}

export default CreateCompanyComponent
