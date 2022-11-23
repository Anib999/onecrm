import React, { useState, useEffect } from 'react'
import AppModal from '../../components/common/modal/modal';
import { Form, Input, Select, Col, Button, message, Modal } from 'antd';
import AppButton from '../../components/common/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVerifyAdminModal } from '../../store/slices/configSlice';
import { validatePasswordApi, validatePasswordByUserApi } from '../../services/profileService';
import { createUpdateUserApi } from '../../services/userService'
import { createUpdateCustomerApi } from '../../services/customerService'

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

const VerifyAdminModal = (props) => {
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
    dispatch(toggleVerifyAdminModal())
  }

  useEffect(() => {
    setShowIsAdminModal(configReducer?.showVerifyAdminModal)
  }, [configReducer?.showVerifyAdminModal])



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
    if(configReducer?.isFromCustomer == true){
      dispatch(validatePasswordByUserApi({
        data: obj,
        finalCallback: () => { },
        successCallback: (e) => {
          if(e == 'OK'){
            handleEnableDisableUser();
          }
          // handleSuccess();
          dispatch(toggleVerifyAdminModal())
        }
      }))
      return;
    }
    dispatch(validatePasswordApi({
      data: obj,
      finalCallback: () => { },
      successCallback: () => {
        handleSuccess();
        dispatch(toggleVerifyAdminModal())
        console.log(props)
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
        handleSuccess();
        closeAdminModal();
      }
    }))
  }

  const handleEnableDisableUser = () => {
    let datae = {
      ...configReducer?.isCustomerData
    }
    datae.cltIsEnabled = !datae?.cltIsEnabled
    dispatch(createUpdateCustomerApi(datae,
      datae.cltClientId,
      (response) => {
        handleSuccess()
      }))
  }

  return (
    <AppModal
      title="Verify your admin credentials"
      visible={configReducer?.showVerifyAdminModal}
      onCancel={closeAdminModal}
      onOk={closeAdminModal}
    >
      <div>
        <h4 className="mb-10">
          You will need to verify admin credential to use this feature
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

export default VerifyAdminModal
