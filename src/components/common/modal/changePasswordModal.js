import React, { useState, useEffect } from 'react'
import AppModal from './modal';
import { Form, Input, Select, Col, Button, message, Modal } from 'antd';
import AppButton from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPasswordApi } from '../../../services/userService';

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
  wrapperCol: { offset: 0, span: 24 },
};

const ChangePasswordModal = (props) => {
  const { isVisible, setShowChangePasswordModal, userId } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const profileReducer = useSelector(state => state.profile);

  const handleFinish = (values) => {
    let obj = {
      loginId: profileReducer?.userData?.UId,
      userId: userId,
      ...values
    }
    console.log('change password obj', obj);
    // return;
    dispatch(changeUserPasswordApi({
      data: obj,
      finalCallback: () => { },
      successCallback: () => {
        closeModal();
      }
    }))
  }

  const closeModal = () => {
    setShowChangePasswordModal(false)
  }

  return (
    <AppModal
      title="Change Password"
      visible={isVisible}
      onCancel={closeModal}
      onOk={closeModal}
    >
      <div>
        {/* <h4 className="mb-10">
          Change Password
      </h4> */}
        <Form
          {...formItemLayout}
          form={form}
          name="control-hooks"
          onFinish={handleFinish}
          colon={false}
          layout='vertical'
          labelAlign="left"
        // initialValues={previousValues}
        >
          <Form.Item
            name="password"
            label="New Password"
          // rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item {...tailLayout} >
            <AppButton
              htmlType='submit'
            >
              Update
        </AppButton>
          </Form.Item>
        </Form>
      </div>


    </AppModal>
  )
}

export default ChangePasswordModal
