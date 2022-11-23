import React, { useState, useEffect } from 'react'
import AppModal from '../../components/common/modal/modal';
import { Form, Input, Select, Col, Button, message, Modal } from 'antd';
import AppButton from '../../components/common/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVerifyCustomerAdminModal } from '../../store/slices/configSlice';
import { validatePasswordApi } from '../../services/profileService';
import { createUpdateUserApi } from '../../services/userService'

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

const VerifyCustomerAdminModal = (props) => {
  const { handleSuccess } = props;
  const [showIsAdminModal, setShowIsAdminModal] = useState(false);
  const [form] = Form.useForm();
  const configReducer = useSelector(state => state.config);
  const profileReducer = useSelector(state => state.profile);
  const userReducer = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [isForEnableUser, setIsForEnableUser] = useState(configReducer?.isForEnableUser)

  useEffect(() => {
    setIsForEnableUser(configReducer?.isForEnableUser)
  }, [configReducer?.isForEnableUser])

  const closeAdminModal = () => {
    setShowIsAdminModal(false)
    dispatch(toggleVerifyCustomerAdminModal())
  }

  useEffect(() => {
    setShowIsAdminModal(configReducer?.showVerifyCustomerAdminModal)
  }, [configReducer?.showVerifyCustomerAdminModal])



  const handleFinish = (values) => {
    if (isForEnableUser) {
      handleEnableUser();
      return
    }

    let obj = {
      loginId: profileReducer?.userData?.UId,
      userId: props?.userId,
      ...values
    }
    dispatch(validatePasswordApi({
      data: obj,
      finalCallback: () => { },
      successCallback: () => {
        handleSuccess();
        dispatch(toggleVerifyCustomerAdminModal())
      }
    }))

  }

  const handleEnableUser = () => {
    let obj = {
      ...userReducer?.users[props?.userId],
      IsActive: true
    }

    dispatch(createUpdateUserApi({
      data: obj,
      finalCallback: () => { },
      successCallback: () => {
        // getAllUsers();
        closeAdminModal();
        handleSuccess();
      }
    }))
  }

  return (
    <AppModal
      title="Verify your admin credentials"
      visible={configReducer?.showVerifyCustomerAdminModal}
      onCancel={closeAdminModal}
      onOk={closeAdminModal}
    >
      <div>
        <h4 className="mb-10">
          You will need to verify admin credential to use this feature as of noew hello theres
      </h4>
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
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Admin password" />
          </Form.Item>
          <Form.Item {...tailLayout} >

            <AppButton
              htmlType='submit'
            >
              Verify
        </AppButton>
          </Form.Item>
        </Form>
      </div>

    </AppModal>
  )
}

export default VerifyCustomerAdminModal
