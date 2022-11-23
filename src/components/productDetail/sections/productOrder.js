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

const ProductOrder = (props) => {
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
        DeliveryDate: moment(values?.EntryDate).format('L'),
        DueArrivalDate: moment(values?.EntryDate).format('L'),
        EntryDate: moment(values?.EntryDate).format('L'),
        OId: 1,
        OrderStatus: 3,
        ProdId: 1,
        RequestedQuantity: 5,
        SampleNumber: 56,
        SamplePrice: 100,
        Status: values?.Status,
        Supplier: supName,
        SupplierId: values?.SupplierId,
        SupplierNote: values?.Memo
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
    dispatch(getProductDetailApi({productId: props?.productId, tempsObj: temObj},
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
            {forEdit ? 'Update' : 'Assign'} Product Order
          </AppButton>
        </div>
      </Form>
    </div>
  )
}

export default ProductOrder
