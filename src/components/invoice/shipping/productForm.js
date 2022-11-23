import React, { useState, useEffect } from 'react'
import AppModal from '../../common/modal/modal';
import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import AppButton from '../../common/button/button';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};



const ProductForm = (props) => {
  const { visible, hideProductForm, handleProductAdd, productList } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleProductAdd(values)
  }


  useEffect(() => {
    form.resetFields()
  }, [visible])

  return (
    <AppModal
      visible={visible}
      title="Add Product"
      onCancel={hideProductForm}
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
            name="productId"
            label={'Product'}
            rules={[{ required: true, message: 'Quantity is required' }]}>
            <Select
              placeholder="Select Product"
              defaultActiveFirstOption
              // onChange={onGenderChange}
              allowClear
              size="middle"
            >
              {productList?.map(prod => {
                return (
                  <Option
                    // value={{ productId: prod?.PId, productName: prod?.ProductName }}
                    value={prod?.PId}
                  >
                    {prod?.ProductName}
                  </Option>
                )
              })
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label={'Quantity'}
            rules={[{ required: true, message: 'Quantity is required' }]}>
            <InputNumber placeholder="Product quantity" />
          </Form.Item>

          <Form.Item
            name="unitPrice"
            label={'Unit Price'}
            rules={[{ required: true, message: 'Quantity is required' }]}>
            <InputNumber placeholder="Unit Price" />
          </Form.Item>


          <Form.Item
            name="remarks"
            label={'Remarks'}
          >
            <TextArea placeholder="Remarks" />
          </Form.Item>

          <div className="modal-form-btn" >
            <AppButton
              className="btn-primary btn-primary--outline"
              onClick={hideProductForm}
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

export default ProductForm
