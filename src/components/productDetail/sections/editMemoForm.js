import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import AppButton from '../../common/button/button';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateSupplierQuotationApi } from '../../../services/productDetailService';

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

const EditMemoForm = (props) => {
  const { supplierDataForEdit, productId, successCallback } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const handleFinish = (values) => {

    let newObj = {
      productId: productId,
      supplierId: supplierDataForEdit?.SupplierId,
      supDate: moment().format('L'),
      userId: 2,
      supNote: values?.SupplierNote,
      actionRemarks: values?.Remarks
    }
    // supplierFormSubmission(newObj)
    handleSupplierEditSubmit(newObj)
  }

  useEffect(() => {
    form.setFieldsValue(supplierDataForEdit)
  }, [])

  const handleSupplierEditSubmit = (values) => {
    dispatch(updateSupplierQuotationApi(values,
      () => {
        successCallback()
      },
      () => { },
      () => { }
    ))
  }

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
          name="Status"
          label="Status"
        >
          <Select
            placeholder="Status"
            allowClear
          >
                <Option value="Pending">
                  Pending
                </Option>
                <Option value="Pending Sample">
                  Pending Sample
                </Option>
                <Option value="Quote Received">
                  Quote Received
                </Option>

          </Select>
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

export default EditMemoForm
