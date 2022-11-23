import React from 'react'
import { Form, Input, Col, Row, DatePicker } from 'antd';
import AppButton from '../../common/button/button';

const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};

const RequestProductOrderForm = () => {
  return (
    <div className="request-product-form">
      <span>Record a information you've received from suppliers,such as estimate date,cost sample date.</span>
      <div className="form">
        <Form
          labelAlign="left"
          colon={false}
          {...formItemLayout}
        >
          <Form.Item name="product_no" label="Product Number" rules={[{ required: true }]}>
            <Input placeholder="Product number/label" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="request_date" label="Request Date" rules={[{}]}>
                <DatePicker
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="due_date" label="Due Date of Arrival" rules={[{}]}>
                <DatePicker
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="quantity" label="Product Quantity" rules={[{}]}>
            <Input placeholder="Product quantity" />
          </Form.Item>

          <Form.Item name="note" label="Memo / Notes" rules={[{}]}>
            <TextArea placeholder="Notes" />
          </Form.Item>
          <div className="modal-form-btn" >
            <AppButton className="btn-primary btn-primary--outline">
              Cancel
          </AppButton>
            <AppButton htmlType="submit">
              Submit
          </AppButton>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RequestProductOrderForm
