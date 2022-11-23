import React, { useState } from 'react';
import CreateSupplierComponent from '../../components/createSupplier';
import { useDispatch, useSelector } from 'react-redux'
import { createUpdateSupplierApi } from '../../services/supplierService';
import { useHistory } from 'react-router-dom'
import moment from 'moment';

const CreateSupplierContainer = (props) => {
  const forEdit = props?.forEdit ?? false;
  const dispatch = useDispatch();
  const supplierReducer = useSelector(state => state.supplier);
  const id = props?.match?.params?.id
  const history = useHistory()
  const [isLoading, setLoading] = useState(false);

  const handleFinish = (values) => {
    console.log('finish in container', values)
    let obj = {
      ...values,
      supSupplierAddDate: moment().format(),
      supSupplierEnabled: true,
      supSupplierAddedUser: 2,
      supSupplierTags: values?.supSupplierTags ?? '',
      supSupplierNotes: values?.supSupplierNotes ?? ''
    }
    if (forEdit) {
      obj = { supSupplierId: id, ...obj }
    }
    setLoading(true);
    dispatch(createUpdateSupplierApi(obj, id,
      () => {
        //successcallback
        history.goBack();
      },
      () => {
        //failure callback
      },
      () => {
        setLoading(false)
      }))
  }

  return (
    <CreateSupplierComponent
      {...props}
      forEdit={forEdit}
      handleFinish={handleFinish}
      supplierReducer={supplierReducer}
      previousValues={forEdit ? supplierReducer?.suppliers[id] : {}}
      isLoading={isLoading}

    />
  )
}

export default CreateSupplierContainer;