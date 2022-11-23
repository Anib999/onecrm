import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import AppButton from '../../common/button/button';
import { createUpdateSupplierQuotationApi } from '../../../services/productService';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailApi } from '../../../services/productService';
import { assignSupplierQuotationApi } from '../../../services/productDetailService';
import { getAllSupplierApi } from '../../../services/supplierService';
import _ from 'lodash';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
};

const { Option } = Select,
      { TextArea } = Input;

const SupplierForm = (props) => {
  const { setSupplierModal, supplierFormPurpose, supplierDataForEdit, supplierFormSubmission, productId, assignedSuppliers } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const supplierReducer = useSelector(state => state.supplier)
  const [supplierList, setSupplierList] = useState([]);
  const forEdit = supplierFormPurpose === 'edit' ? true : false;
  const [tempVal, settempVal] = useState({});

  useEffect(() => {
    let suppliers = [];
    supplierReducer?.allSuppliersId?.forEach(item => {
      suppliers.push(supplierReducer?.suppliers[item])
    });
    if (suppliers.length === 0) {
      getAllSupplier()
    }
    setSupplierList(suppliers)
  }, [supplierReducer?.allSuppliersId])

  const handleFinish = (values) => {
    // console.log('values', values)
    let obj = {
      productId: props?.productId,
      supplierId: values?.SupplierId,
      status: 1,
      entrydate: moment(values?.EntryDate).format('L'),
      remarks: '_',
      action: '_',
      userId: 2
    }

    let supName = 'Test';
    supplierList.map((sup, supIndex) => {
      if(sup?.supSupplierId == values?.SupplierId){
        supName = sup?.supSupplierName
      }
    })

    let temObj = {
      ActionRemarks: values?.Memo,
      EntryDate: moment(values?.EntryDate).format('L'),
      EstimatedPrice: 21,
      PStatus: 1,
      ProdId: 1,
      QId: 9,
      Quantity: 3,
      Remarks: values?.Memo,
      SampleStatus: values?.Status,
      SuppSuplierDate: moment(values?.EntryDate).format('L'),
      Supplier: supName,
      SupplierId: values?.SupplierId,
      SupplierNote: values?.Memo,
      UserId: 2,
    }
    
    // return;
    setLoading(true)
    // dispatch(assignSupplierQuotationApi(obj, null,
    //   (response) => {
        //success callback
        form.resetFields();
        setSupplierModal(false);
        getProductDetail(temObj);
      // },
      // () => {
      //   //failure callback
      // },
      // () => {
      //   //final callback
      //   setLoading(false)
      // }))
  }

  const getProductDetail = (temObj={}) => {
    dispatch(getProductDetailApi({productId: props?.productId, temObj: temObj},
      () => { }))
  }

  const getAllSupplier = () => {
    dispatch(getAllSupplierApi({ page: 1 },
      () => { console.log('final callback') }))
  }

  return (
    <div>
      <Form
        labelAlign="left"
        colon={false}
        form={form}
        onFinish={handleFinish}
        {...formItemLayout}
      >

        <Form.Item
          name="SupplierId"
          label="Supplier"
          rules={[{ required: true, message: 'Supplier is required' }]}
          size="large"
        >
          <Select
            placeholder="Select Supplier"
            // mode="multiple"
            allowClear
          >
            {supplierList.map((sup, supIndex) => {
              return (
                <Option
                  value={sup?.supSupplierId}
                  // disabled={_.includes(assignedSuppliers, sup?.supSupplierId) ?? false}
                >
                  {sup?.supSupplierName}
                </Option>
              )
            })}

          </Select>
        </Form.Item>

        <Form.Item
          name="EntryDate"
          label="Assigned Date"
          rules={[{ required: true, message: 'Assigned Date is required' }]}
        >
          <DatePicker size="small" />
        </Form.Item>

        <Form.Item
          name="Memo"
          label="Memo"
        >
          <TextArea placeholder="Memo" />
        </Form.Item>

        <Form.Item
          name="Status"
          label="Status"
        >
          <Select
            placeholder="Status"
            // mode="multiple"
            allowClear
          >
            {/* {supplierList.map((sup, supIndex) => {
              return ( */}
                <Option value="Pending">
                  Pending
                </Option>
                <Option value="Pending Sample">
                  Pending Sample
                </Option>
                <Option value="Quote Received">
                  Quote Received
                </Option>
              {/* )
            })} */}

          </Select>
        </Form.Item>

        <div className="modal-form-btn" >
          <AppButton htmlType="submit" loading={isLoading}>
            {/* {forEdit ? 'Update' : 'Assign'} Suppliers */}
            {forEdit ? 'Update' : 'Assign'} Sample Quote
          </AppButton>
        </div>
      </Form>
    </div>
  )
}

export default SupplierForm
