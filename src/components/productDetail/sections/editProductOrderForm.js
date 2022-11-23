import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import AppButton from '../../common/button/button';
import { createUpdateSupplierQuotationApi } from '../../../services/productService';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailApi } from '../../../services/productService';
import { getAllSupplierApi } from '../../../services/supplierService';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};

const { TextArea } = Input;
const { Option } = Select;

const EditProductOrderForm = (props) => {
  const { supplierDataForEdit, supplierFormSubmission, productId } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm();

  // console.log('supplierDataForEdit', supplierDataForEdit)

  const handleFinish = (values) => {
    // handleFinish(values)
  }

  useEffect(() => {
    form.setFieldsValue(supplierDataForEdit)
  }, [])

  return (
    <div>
      <Form
        labelAlign="left"
        colon={false}
        form={form}
        onFinish={handleFinish}
        {...formItemLayout}
      // initialValues={prevVal}
      >

        <Form.Item
          name="SupplierNote"
          label="Supplier Note"
        >
          <TextArea placeholder="Note" />
        </Form.Item>
        <Form.Item
          name="Remarks"
          label="Remarks"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="Note" />
        </Form.Item>

        <div className="modal-form-btn" >
          <AppButton htmlType="submit" loading={isLoading}>
            Update
          </AppButton>
        </div>
      </Form>
    </div>
  )
}

export default EditProductOrderForm
