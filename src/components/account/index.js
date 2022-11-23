import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd';
import AppButton from '../common/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailApi } from '../../services/userService';
import AppSpinner from '../../components/common/spinner';


const { Option } = Select;

const OverViewComponent = (props) => {
  const { handleFinish, userId, userData } = props;
  const departmentReducer = useSelector(state => state.department);
  const [departmentIds, setDepartmentIds] = useState(departmentReducer?.allDepartmentIds)
  const dispatch = useDispatch();


  const onFinish = (values) => {
    handleFinish(values)
  }

  let departments = [];
  departmentIds?.forEach(item => {
    departments.push(departmentReducer?.departments[item])
  })

  return (
    <>
      <Form
        layout='vertical'
        name="basic"
        // initialValues={user}
        onFinish={onFinish}
        initialValues={userData}
      >
        <Form.Item
          label="Username"
          name="UserName"
          rules={[{ required: true, message: 'Please enter your userName!', }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="FullName"
          rules={[{ required: true, message: 'Please enter your name!', }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="UserEmail"
          rules={[{ required: true, label: 'Email', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="Location"
        // rules={[{ required: true, message: 'Please enter your contact!' }]}
        >
          <Input />
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
        <AppButton
          htmlType='submit'
        >
          Update
              </AppButton>
      </Form>
    </>
  )
}

export default OverViewComponent
