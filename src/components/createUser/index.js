import React, { useState, useEffect } from 'react'
import PageHeader from '../common/pageHeader';
import { Form, Input, Select, Col, Button, message, Switch } from 'antd';
import AppButton from '../common/button/button';
import { useDispatch, useSelector } from 'react-redux';
import AppModal from '../common/modal/modal';
import { toggleVerifyAdminModal } from '../../store/slices/configSlice';
import ChangePasswordModal from '../../components/common/modal/changePasswordModal';

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
const CreateUserComponent = (props) => {
  const { forEdit, handleFinish, previousValues, userRoles, departments, userId } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const profileReducer = useSelector(state => state.profile);
  const [hasAdminAccess, setHasAdminAccess] = useState(!forEdit);
  const isAdmin = profileReducer?.userData?.Role === 1
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  const handleVerifyClick = (forEnable) => {
    // message.info('Only admin can change password')
    // setHasAdminAccess(true)
    // setShowAdminModal(true)

    dispatch(toggleVerifyAdminModal({ forEnableUser: forEnable }))
  }

  const handleChangePasswordClick = () => {
    setShowChangePasswordModal(true)
  }

  // console.log('previousValues', previousValues)


  return (
    <>
      <PageHeader
        title={`${forEdit ? 'Edit' : 'Add new '} User`}
        hasBreadcrumb
      />
      <Col span={16}>

        <Form
          {...formItemLayout}
          form={form} name="control-hooks"
          onFinish={handleFinish}
          colon={false}
          labelAlign="left"
          initialValues={previousValues}
        >
          <Form.Item
            name="UserName"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          {!forEdit &&
            <Form.Item
              name="UserPassword"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="Password"
              // disabled={!isAdmin}
              />

            </Form.Item>
          }
          {/* <div className="change-password">
            <Button type="link" onClick={handleVerifyClick} >Change Password</Button>
          </div> */}
          <Form.Item
            name="UserEmail"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>


          <Form.Item
            name="FullName"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Full name" />
          </Form.Item>

          <Form.Item
            name="Location"
            label="Location"
          // rules={[{ required: true }]}
          >
            <Input placeholder="Location" />
          </Form.Item>

          <Form.Item name="UserRoleId" label="User Role" rules={[{ required: true }]} >
            <Select
              placeholder="Select User role/type"
              size="large"
              // onChange={onGenderChange}
              allowClear
            >{userRoles.map(roles => {
              if(forEdit){
                  return (
                    <Option value={roles?.RId}>{roles?.RoleType}</Option>
                  )
              }else{
                if(roles.RoleType.toLowerCase().includes('admin') == false){
                  return (
                    <Option value={roles?.RId}>{roles?.RoleType}</Option>
                  )
                }
              }
            })}
            </Select>
          </Form.Item>
          <Form.Item name="DepartmentId" label="Department" rules={[{ required: true }]} >
            <Select
              placeholder="Select Department"
              size="large"
              // onChange={onGenderChange}
              allowClear
            >{departments.map(dept => {
              return (
                <Option value={dept?.DId}>{dept?.DepartmentName}</Option>
              )
            })}
            </Select>
          </Form.Item>
          {forEdit && isAdmin ?
            //for admin only while editing
            // <Form.Item
            //   // name='IsActive'
            //   label="Active">
            //   <Switch
            //     checked={previousValues?.IsActive ?? false}
            //     onClick={(data) => handleVerifyClick(!previousValues?.IsActive)}

            //   />
            // </Form.Item>
            <></>
            :
            <></>
            // <Form.Item
            //   name='IsActive'
            //   label="Active">
            //   <Switch
            //     defaultChecked={previousValues?.IsActive ?? false}
            //     disabled={forEdit}

            //   />
            // </Form.Item>
          }
          {isAdmin && forEdit &&
            <div className="change-password">
              <Button type="link" onClick={handleChangePasswordClick} >Change Password?</Button>
            </div>
          }

          <Form.Item {...tailLayout} >
            <AppButton
              htmlType='submit'
            >
              {forEdit ? 'Update' : 'Add'}
            </AppButton>
          </Form.Item>
        </Form>
      </Col>
      <ChangePasswordModal
        isVisible={showChangePasswordModal}
        setShowChangePasswordModal={setShowChangePasswordModal}
        userId={userId}
      />

    </>
  )
}

export default CreateUserComponent
