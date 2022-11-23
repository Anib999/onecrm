import React from 'react'
import { Form, Input } from 'antd';
import AppButton from '../common/button/button';

const ChangePasswordComponent = () => {
  return (
    <div>
      <Form
        layout='vertical'
        name="basic"
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password Again"
          name="confirmationPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <AppButton>
          Change Password
              </AppButton>
      </Form>
    </div>
  )
}

export default ChangePasswordComponent
