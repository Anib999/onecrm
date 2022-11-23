import React from 'react';
import { Form, Input, Checkbox, Card } from 'antd';
import AppButton from '../common/button/button';

// const layout = {
//   labelCol: { span: 24 },
//   wrapperCol: { span: 24 },
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const LoginComponent = ({ handleLogin }) => {

  const onFinish = (values) => {
    handleLogin(values);

    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-bg-wrapper">
      <div className="login-bg">
      </div>
      <Card className="login-card">

        <div className="welcome">
          <h2>Welcome Back! </h2>
          <p>Use Your Credentials To Enter Inside The System</p>
        </div>
        <div className="form">
          <Form
            layout='vertical'
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            > */}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" className="form--checkbox">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item className="form--btn" >
              <AppButton
                className="btn-primary"
                htmlType="submit"
              >
                Login
                    </AppButton>
            </Form.Item>
          </Form>
        </div>
      </Card>

    </div>
  )
}

export default LoginComponent;