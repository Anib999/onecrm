import React, { useState } from 'react'
import AppTable from '../../common/table/table';
import FilterComponent from '../../common/filter/filter';
import ActionButton from '../../common/button/productActionButton';
import AppModal from '../../common/modal/modal';
import ProductStatusChangeForm from './productStatusChangeForm';
import { productOrderStatus } from '../../../constants/statusList';
import moment from 'moment';
import { receivedProductOrderApi } from '../../../services/productDetailService';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailApi } from '../../../services/productService';
import AppButton from '../../common/button/button';
import ProductOrder from './productOrder';

const DetailProductOrder = (props) => {
  const { data, productId } = props;
  const [receivedProductModal, setReceivedProductModal] = useState(false);
  const [addToShippedModal, setAddToShippedModal] = useState(false);
  const [selectedProductOrder, setSelectedProductOrder] = useState({})

  const [supplierModal, setSupplierModal] = useState(false);
  const [supplierFormPurpose, setSupplierFormPurpose] = useState(false);
  const [assignedSuppliers, setAssignedSuppliers] = useState([]);

  const dispatch = useDispatch();

  const handleStatusChangeSubmission = (val) => {
    // console.log('handle status change submission', val)
  }


  const handleReceivedProductSubmit = (val) => {
    let obj = {
      orderId: selectedProductOrder?.POId,
      userId: 2,
      deliveryDate: moment(val?.date).format('L'),
      supplierNote: val?.note
    }
    // console.log('submission value', obj)

    dispatch(receivedProductOrderApi(obj,
      () => {
        setReceivedProductModal(false);
        getProductDetail()
      },
      () => { },
      () => { }))
  }

  const getProductDetail = () => {
    dispatch(getProductDetailApi(productId,
      () => { }))
  }

  const columns = [
    {
      title: 'Ordered Date',
      dataIndex: 'OrderDate',
      render: (data) => {
        return (
          <span>{moment(data).format('LL')}</span>
        )
      }
    },
    {
      title: 'Supplier',
      dataIndex: 'Supplier'
    },
    {
      title: 'Status',
      dataIndex: 'Status'
    },
    {
      title: 'Product Quantity',
      dataIndex: 'OrderQuantity'
    },
    {
      title: 'Delivery Date',
      dataIndex: 'DeliveryDate',
      render: (data) => {
        return (
          <span>{moment(data).format('LL')}</span>
        )
      }
    },
    {
      title: 'Memo / Note',
      dataIndex: 'OrderNote'
    },

    {
      title: 'Actions',
      dataIndex: '',
      render: (data) => {
        const menuList = productOrderStatus[data?.Status] ?? []
        return (
          <ActionButton
            data={data}
            getButtonAction={(action) => {
              getButtonAction(action);
              setSelectedProductOrder(data);
            }}
            menuList={menuList}
            getProductDetail={getProductDetail}
            showEdit
          />
        )
      }
    }
  ]

  const getButtonAction = (action) => {
    if (action === 'receivedProductForm') {
      setReceivedProductModal(true)
    } else if (action === 'addToShippedForm') {
      setAddToShippedModal(true)
    }
  }

  return (
    <div>
      <AppButton 
      title="Sample Quote"
      className="btn-primary pull-right"
      onClick={() => {
        setSupplierModal(true);
        setSupplierFormPurpose('add');
      }}
      >Product Order</AppButton>
      {/* <FilterComponent /> */}
      <AppTable
        columns={columns}
        dataSource={data?.tabs?.ProductOrderDetails}
      />
      <AppModal
        title="Received Product"
        visible={receivedProductModal}
        onCancel={() => setReceivedProductModal(false)}
        onOk={() => { }}
      // footer={true}
      >
        <ProductStatusChangeForm
          onCancel={() => setReceivedProductModal(false)}
          handleFinish={(val) => handleReceivedProductSubmit(val)}
          date
          note
          dateLabel="Delivery Date"
        />
      </AppModal>
      <AppModal
        title="Add To Shipped"
        visible={addToShippedModal}
        onCancel={() => setAddToShippedModal(false)}
        onOk={() => { }}
      // footer={true}
      >
        <>
          <ProductStatusChangeForm
            onCancel={() => setReceivedProductModal(false)}
            handleFinish={(val) => handleStatusChangeSubmission(val)}
            date
            quantity
            price
            note
            priceLabel="Selling Price"

          />
        </>
      </AppModal>

      <AppModal
        title={`Assign Supplier`}
        visible={supplierModal}
        onCancel={() => setSupplierModal(false)}
        onOk={() => { }}
      >
        <ProductOrder
          setSupplierModal={setSupplierModal}
          productId={productId}
          supplierFormPurpose={supplierFormPurpose}
          assignedSuppliers={assignedSuppliers}
        />
      </AppModal>
    </div>
  )
}

export default DetailProductOrder
