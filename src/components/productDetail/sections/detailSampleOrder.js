import React, { useState } from 'react'
import AppTable from '../../common/table/table';
import FilterComponent from '../../common/filter/filter';
import ActionButton from '../../common/button/productActionButton';
import AppModal from '../../common/modal/modal';
import { sampleOrderStatus } from '../../../constants/statusList';
import ProductStatusChangeForm from './productStatusChangeForm';
import { useDispatch, useSelector } from 'react-redux';
import { receivedSampleOrderApi, requestProductOrderApi } from '../../../services/productDetailService';
import moment from 'moment';
import { getProductDetailApi } from '../../../services/productService';
import AppButton from '../../common/button/button';

import OrderForm from './orderForm';

const DetailSampleOrder = (props) => {
  const { data, productId } = props;
  const [requestOrderModal, setRequestOrderModal] = useState(false);
  const [receivedOrderModal, setReceivedOrderModal] = useState(false);
  const [requestProductOrderModal, setRequestProductOrderModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedSampleOrder, setSelectedSampleOrder] = useState({})

  const [supplierModal, setSupplierModal] = useState(false);
  const [supplierFormPurpose, setSupplierFormPurpose] = useState(false);
  const [assignedSuppliers, setAssignedSuppliers] = useState([]);

  const columns = [
    {
      title: 'Entry Date',
      dataIndex: 'EntryDate',
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
      dataIndex: 'SupplierNote',
      render: (data) => {
        return (
          <span>
            {data}
          </span>
        )
      }
    },

    {
      title: 'Actions',
      dataIndex: '',
      render: (data) => {
        const menuList = sampleOrderStatus[data?.Status] ?? []
        return (
          <ActionButton
            // menu={menu}
            data={data}
            getButtonAction={(action) => {
              getButtonAction(action);
              setSelectedSampleOrder(data)
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
    if (action === 'receivedSampleOrderForm') {
      setReceivedOrderModal(true)
    } else if (action === 'deletePrompt') {

    } else if (action === 'requestProductOrderForm') {
      setRequestProductOrderModal(true)
    }
  }


  const handleReceivedSampleOrderSubmit = (val) => {
    let obj = {
      orderId: selectedSampleOrder?.OId,
      userId: 2,
      deliveryDate: moment(val?.date).format('L'),
      supplierNote: val?.note ?? ''
    };
    dispatch(receivedSampleOrderApi(obj,
      () => {
        setReceivedOrderModal(false);
        getProductDetail()
      },
      () => { },
      () => { }))
    // console.log('handleReceivedSampleOrderSubmit', obj, val)
  }

  const handleRequestProductOrderSubmit = (val) => {
    console.log('submitted values', val)
    let obj = {
      productId: productId,
      supplierId: selectedSampleOrder?.SupplierId,
      note: val?.note ?? '',
      entryDate: moment().format('L'),
      userId: 2,
      quantity: val?.quantity,
      price: val?.price,
      dueArrivalDate: moment(val?.date).format('L')
    };
    dispatch(requestProductOrderApi(obj,
      () => {
        setRequestProductOrderModal(false);
        getProductDetail();
      },
      () => { },
      () => { }))
  }

  const getProductDetail = () => {
    dispatch(getProductDetailApi(productId,
      () => { }))
  }


  return (
    <div>
      <AppButton 
      title="Sample Order"
      className="btn-primary pull-right"
      onClick={() => {
        // setRequestProductOrderModal(true)
        setSupplierModal(true);
        setSupplierFormPurpose('add');
      }}
      onCancel={() => setRequestProductOrderModal(false)}
      >Sample Order</AppButton>
      {/* <FilterComponent /> */}
      <AppTable
        columns={columns}
        dataSource={data?.tabs?.SampleOrderDetails ?? []}
      />

      <AppModal
        title={`Assign Supplier`}
        visible={supplierModal}
        onCancel={() => setSupplierModal(false)}
        onOk={() => { }}
      >
        <OrderForm
          setSupplierModal={setSupplierModal}
          productId={productId}
          supplierFormPurpose={supplierFormPurpose}
          assignedSuppliers={assignedSuppliers}
        />
      </AppModal>

      <AppModal
        title="Request for Product Order"
        visible={requestProductOrderModal}
        onCancel={() => setRequestProductOrderModal(false)}
        onOk={() => { }}
      // footer={true}
      >
        <ProductStatusChangeForm
          onCancel={() => setRequestProductOrderModal(false)}
          handleFinish={(val) => handleRequestProductOrderSubmit(val)}
          date
          note
          quantity
          price
          dateLabel="Due Arrival Date"
        />
      </AppModal>

      <AppModal
        title="Received Sample Order"
        visible={receivedOrderModal}
        onCancel={() => setReceivedOrderModal(false)}
        onOk={() => { }}
      // footer={true}
      >
        <ProductStatusChangeForm
          onCancel={() => setReceivedOrderModal(false)}
          handleFinish={(val) => handleReceivedSampleOrderSubmit(val)}
          date
          note
          dateLabel="Delivery Date"
        />
      </AppModal>
    </div>
  )
}

export default DetailSampleOrder
