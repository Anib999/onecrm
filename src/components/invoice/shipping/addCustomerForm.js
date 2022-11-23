import React from 'react'
import AppModal from '../../common/modal/modal';
import AppButton from '../../common/button/button';
import { Form, Input, InputNumber, Select, Row, Col } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};

const AddClientForm = (props) => {
  const { visible, hideCustomerForm, customerList, handleCustomerSelect, getData } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleCustomerSelect(values)
  }

  const demoMethod = (value) => {
    props.getData(value);
  }

  return (
    <AppModal
      visible={visible}
      title="Add Client"
      onCancel={hideCustomerForm}
    >
      <>
        <Form
          labelAlign="left"
          colon={false}
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
        >

          <Form.Item
            name="customerId"
            label={'Customer Name'}
            rules={[{ required: true, message: 'Customer is required' }]}
          >
            <Select
              placeholder="Select Customer"
              defaultActiveFirstOption
              onChange={(value) => {demoMethod(value)}}
              // onGenderChange
              allowClear
              size="middle"
            >
              {customerList?.map(customer => {
                return (
                  <Option
                    // value={{ productId: prod?.PId, productName: prod?.ProductName }}
                    value={customer?.cltClientId}
                  >
                    {customer?.cltClientName}
                  </Option>
                )
              })
              }
            </Select>
          </Form.Item>

          <div className="modal-form-btn" >
            <AppButton
              className="btn-primary btn-primary--outline"
              onClick={hideCustomerForm}
            >
              Cancel
          </AppButton>
            <AppButton
              htmlType="submit"
            >
              Add
          </AppButton>
          </div>
        </Form>
      </>
    </AppModal>
  )
}

export default AddClientForm
