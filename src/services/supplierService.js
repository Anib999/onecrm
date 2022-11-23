import { createSupplierSuccess, editSupplierSuccess, deleteSupplierSuccess } from '../store/slices/supplierSlice';
import { message } from 'antd';
import { fetchSupplier, createSupplier } from '../constants/url';
import { getAllSupplierSuccess } from '../store/slices/supplierSlice';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';


//for now this is just imitating api call

export const getAllSupplierApi = (params, finalCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(fetchSupplier)
      if (response?.status === 200) {
        dispatch(getAllSupplierSuccess(response?.data))
      }
    }
    catch (error) {
      console.log('error---', error)
    }
    finally {
      finalCallback()
    }
  }
}
export const createUpdateSupplierApi = (data, supplierId, successCallback, failureCallback, finalCallback) => {
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store(createSupplier, formData)
      if (response?.data?.SuccessMsg) {
        successCallback()
        let responseObj = {
          ...data,
          supSupplierId: response?.data?.CreatedId
        }
        if (supplierId) {
          dispatch(editSupplierSuccess({ data: responseObj, supplierId: supplierId }))
        } else {
          dispatch(createSupplierSuccess({ data: responseObj }))
        }
        message.success(response?.data?.Message)
      } else {
        message.error(response?.data?.Message)
      }
    }
    catch (error) {
      console.log('error here', error)
    }
    finally {
      finalCallback()
    }
  }
}

export const deleteSupplierApi = (data, finalCallback) => {
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data)
      const response = await store(createSupplier, formData);
      if (response?.data?.SuccessMsg) {
        message.success('Supplier deleted successfully!');
        dispatch(deleteSupplierSuccess({ id: data?.supSupplierId }))
      } else {
        message.error(response?.data?.Message)
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      finalCallback()
    }


  }
}