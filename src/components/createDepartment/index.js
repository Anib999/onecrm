import React from 'react'
import PageHeader from '../common/pageHeader';
import { Form, Input, Col, Switch } from 'antd';
import AppButton from '../common/button/button';


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

const CreateDepartmentComponent = (props) => {
  const { forEdit, handleFinish, previousValues } = props
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleFinish(values);
  }


  return (
    <>
      <PageHeader
        title={`${forEdit ? 'Edit' : 'Add new '} Department`}
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
            name="DepartmentName"
            label="Department Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Department Name" />
          </Form.Item>
          {/* <Form.Item
            name='IsActive'
            label="Active">
            <Switch
              defaultChecked={previousValues?.IsActive ?? false}
            // disabled={forEdit}

            />
          </Form.Item> */}
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

export default CreateDepartmentComponent
