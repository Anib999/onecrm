import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Col, Select, InputNumber } from 'antd';
import AppButton from '../../common/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateCustomerAddressApi } from '../../../services/customerService';
import moment from 'moment';
// import { getAddressTypeApi } from '../../../services/extraServices';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const AddressFormComponent = (props) => {
  const { valueCallback, purpose, previousValues, customerId, setAddressModal, createUpdateAddressSuccess } = props
  const [form] = Form.useForm();
  const forEdit = purpose === 'edit' ? true : false
  const dispatch = useDispatch();
  const configReducer = useSelector(state => state.config)
  const [isLoading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState(configReducer?.addressType)
  const addressId = null;
  // const [fetchingAddress, setFetchingAddress] = useState(false);

  useEffect(() => {
    setAddressType(configReducer?.addressType)
  }, [configReducer?.addressType])


  useEffect(() => {
    if (!forEdit) {
      form.resetFields()
    }
  }, [purpose])

  const onFinish = (values) => {
    let obj = {
      ...values,
      UserId: 2,
      ClientId: customerId,
      Entrydate: moment().format()
    }
    if (forEdit) {
      obj = {
        ...obj,
        CaId: previousValues?.CaId
      }
    }
    // console.log('fin obj', obj, values, previousValues)
    // return;
    setLoading(true)

    // console.log('final submission object', obj)
    dispatch(createUpdateCustomerAddressApi(obj, customerId, addressId,
      (response) => {
        //successcallback
        form.resetFields()
        setAddressModal(false)
        createUpdateAddressSuccess(response)
      },
      () => {
        //failurecallback
      },
      () => {
        //finalcallback
        setLoading(false);
      }))

  }

  // const getAddressList = () => {
  //   setFetchingAddress(true)
  //   dispatch(getAddressTypeApi(
  //     (response) => {
  //       setAddressType(response)
  //     },
  //     () => { },
  //     () => { setFetchingAddress(false) }
  //   ))
  // }

  // let prevVal = {
  //   ...previousValues,
  //   AddressType: 'Billing Address'
  // }

  // console.log('prevVal', prevVal)

  useEffect(() => {
    form.setFieldsValue(previousValues);
  }, [previousValues])

  return (
    <>
      <Col span={24}>
        <Form
          {...formItemLayout}
          labelAlign="left"
          form={form}
          colon={false}
          onFinish={onFinish}
          initialValues={previousValues}
          name="control-hooks" >

          <Form.Item
            name="AddressType"
            label="Address type"
            rules={[{ required: true, message: 'Address Type is required' }]} >
            <Select
              placeholder="Select Address Type"
              allowClear
              size="large"
            // onFocus={() => getAddressList()}
            // loading={fetchingAddress}
            >
              {addressType.map((add, addIndex) => {
                return (
                  <Option key={addIndex.toString()} value={add?.AId}>{add?.AddressType}</Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="AddressName"
            label="Address Name"
            rules={[{ required: true, message: 'Address Name is required' }]} >
            <Input placeholder="Label or Name" />
          </Form.Item>

          <Form.Item
            name="ContactPerson"
            label="Contact Person"
          // rules={[{ required: true, message: 'Contact Person is required' }]}
          >
            <Input placeholder="Contact person name" />
          </Form.Item>

          <Form.Item
            name="PostalCode"
            label="Postal Code"
            // rules={[{ required: true, message: 'Postal Code is required' }]}
          >
            <InputNumber placeholder="Postal/zip code" />
          </Form.Item>

          <Form.Item
            name="Prefecture"
            label="Prefecture"
            // rules={[{ required: true, message: 'Prefecture is required' }]}
          >
            <Input placeholder="Prefecture" />
          </Form.Item>

          <Form.Item
            name="City"
            label="City"
            // rules={[{ required: true, message: 'City is required' }]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="Address1"
            label="Address 1"
            // rules={[{ required: true, message: 'Address 1 is required' }]}
          >
            <Input placeholder="Address 1" />
          </Form.Item>

          <Form.Item
            name="Address2"
            label="Address 2"
          // rules={[{ required: true, message: 'Address 2 is required' }]}
          >
            <Input placeholder="Address 2" />
          </Form.Item>

          <Form.Item
            name="TelephoneNo"
            label="Telephone Number"
          // rules={[{ required: true, message: 'Telephone number is required' }]}
          >
            <Input placeholder="Contact number" />
          </Form.Item>



          <Form.Item
            name="EmailAddress"
            label="Email Address"
          // rules={[{ required: true, message: 'Email address is required' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <div className="modal-form-btn" >
            <AppButton
              htmlType="submit"
              loading={isLoading}
            >
              {forEdit ? 'Update' : 'Save'}
            </AppButton>
          </div>
        </Form>
      </Col>
    </>
  )
}

export default AddressFormComponent;