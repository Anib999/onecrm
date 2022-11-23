import React, { useState, useEffect } from 'react'
import AppTable from '../../common/table/table';
import FilterComponent from '../../common/filter/filter';
import ActionButton from '../../common/button/productActionButton';
import AppModal from '../../common/modal/modal';
import ProductStatusChangeForm from './productStatusChangeForm';
import SupplierForm from './supplierForm';
import { sampleQuoteStatus } from '../../../constants/statusList';
import moment from 'moment';
import { getProductDetailApi } from '../../../services/productService';
import { useDispatch } from 'react-redux';
import { receivedSampleQuoteApi, requestSampleOrderApi } from '../../../services/productDetailService';
import AppButton from '../../common/button/button';

const DetailSampleQuote = (props) => {
  const { productId, data } = props;
  const [sampleOrderModal, setRequestSampleOrderModal] = useState(false);
  const [supplierModal, setSupplierModal] = useState(false);
  const [supplierFormPurpose, setSupplierFormPurpose] = useState(false);
  const [receivedSampleQuoteForm, setReceivedSampleQuoteForm] = useState(false);
  const dispatch = useDispatch();
  const [activeSampleQuote, setActiveSampleQuote] = useState({})
  const [assignedSuppliers, setAssignedSuppliers] = useState([]);
  const [requestProductOrderModal, setRequestProductOrderModal] = useState(false)

  const columns = [
    {
      title: 'Assigned Date',
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
      dataIndex: 'SampleStatus'
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
        const menuList = sampleQuoteStatus[data?.SampleStatus];
        return (
          <ActionButton
            data={data}
            productId={productId}
            menuList={menuList}
            getButtonAction={(action) => {
              getButtonAction(action);
              setActiveSampleQuote(data)
            }}
            showEdit
            getProductDetail={getProductDetail}
          />
        )
      }
    }
  ]

  const getButtonAction = (action) => {

    if (action === 'receivedQuoteForm') {
      return setReceivedSampleQuoteForm(true)
    } else if (action === 'requestSampleOrderForm') {
      return setRequestSampleOrderModal(true)
    } else if (action === 'deletePrompt') {
      return
    } else if (action === 'requestProductOrderForm') {
      return setRequestProductOrderModal(true)
    }
  }

  const handleRequestSampleOrderSubmit = (val) => {
    let obj = {
      productId: productId,
      supplierId: activeSampleQuote?.SupplierId,
      quotationId: activeSampleQuote?.QId,
      remarks: val?.note ?? '',
      entryDate: moment().format('L'),
      userId: activeSampleQuote?.UserId,
      quantity: val?.quantity,
      price: val?.price,
      dueArrivalDate: moment(val?.date).format('L'),
    }
    dispatch(requestSampleOrderApi(obj,
      () => {
        setRequestSampleOrderModal(false);
        getProductDetail();
      },
      () => { },
      () => { }))
  }

  const handleReceivedQuoteSubmit = (val) => {
    let obj = {
      productId: productId,
      supplierId: activeSampleQuote?.SupplierId,
      quotationDate: activeSampleQuote?.EntryDate,
      userId: 2,
      supNote: val?.note ?? '',
      actionRemarks: activeSampleQuote?.ActionRemarks
    }
    dispatch(receivedSampleQuoteApi(obj,
      () => {
        setReceivedSampleQuoteForm(false)
        getProductDetail()
      },
      () => { },
      () => { }))
  }

  const getProductDetail = () => {
    dispatch(getProductDetailApi(props?.productId,
      () => { }))
  }

  useEffect(() => {
    let assigned = [];
    if (data?.tabs) {
      data?.tabs?.SampleQuoteDetails?.forEach(item => {
        assigned?.push(item?.SupplierId)
      })
      setAssignedSuppliers(assigned)
    }
  }, [data])


  return (
    <div>
      <AppButton 
      title="Sample Quote"
      className="btn-primary pull-right"
      onClick={() => {
        setSupplierModal(true);
        setSupplierFormPurpose('add');
      }}
      >Sample Quote</AppButton>
      {/* <FilterComponent
        hasAdditionalButton
        buttonTitle="Sample Quote"
        additionalButtonClick={() => {
          setSupplierModal(true);
          setSupplierFormPurpose('add');
        }}
      /> */}
      <AppTable
        columns={columns}
        dataSource={data?.tabs?.SampleQuoteDetails ?? []}
      />
      <AppModal
        title="Request for Sample Order"
        visible={sampleOrderModal}
        onCancel={() => setRequestSampleOrderModal(false)}
      >
        <ProductStatusChangeForm
          onCancel={() => setRequestSampleOrderModal(false)}
          handleFinish={(val) => handleRequestSampleOrderSubmit(val)}
          date
          note
          quantity
          price
        />
      </AppModal>

      <AppModal
        title="Received Sample Quote"
        visible={receivedSampleQuoteForm}
        onCancel={() => setReceivedSampleQuoteForm(false)}
      >
        <ProductStatusChangeForm
          onCancel={() => setReceivedSampleQuoteForm(false)}
          handleFinish={(val) => handleReceivedQuoteSubmit(val)}
          date
          note
        />
      </AppModal>

      <AppModal
        title={`Assign Supplier`}
        visible={supplierModal}
        onCancel={() => setSupplierModal(false)}
        onOk={() => { }}
      >
        <SupplierForm
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
          // handleFinish={(val) => handleRequestProductOrderSubmit(val)}
          date
          note
          quantity
          price
          dateLabel="Due Arrival Date"
        />
      </AppModal>
    </div>
  )
}

export default DetailSampleQuote
