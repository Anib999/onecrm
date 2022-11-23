import { fetchCustomer, createCustomer, createUpdateCustomerAddress, getAddressListByCustomerId } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { message } from 'antd'
import { getAllCustomerSuccess, createCustomerSuccess, editCustomerSuccess, deleteCustomerSuccess, getCustomerDetailSuccess, createAddressSuccess, editAddressSuccess } from '../store/slices/customerSlice';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getAllCustomerApi = (params, finalCallback) => {
  return async dispatch => {
    try {
      let url = `${fetchCustomer}?clientId=0`
      const response = await fetch(url)
      // console.log('rsponse', response);
      if (response?.status === 200) {
        dispatch(getAllCustomerSuccess(response?.data))
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

export const createUpdateCustomerApi = (data, customerId, successCallback, finalCallback) => {
  //api for create and update customer/client
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data)      

      const response = await store(createCustomer, formData)
      if (response?.data?.SuccessMsg) {
        successCallback(response?.data)
        let responseObj = {
          ...data,
          cltClientId: response?.data?.CreatedId
        }
        if (customerId) {
          dispatch(editCustomerSuccess({ data: responseObj, customerId: customerId }))
        } else {
          dispatch(createCustomerSuccess({ data: responseObj }))
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
      // finalCallback()
    }
  }
}

export const deleteCustomerApi = (data, finalCallback) => {
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data)
      const response = await store(createCustomer, formData);
      if (response?.data?.SuccessMsg) {
        message.success('Customer deleted successfully!');
        dispatch(deleteCustomerSuccess({ id: data?.cltClientId }))
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

export const createUpdateCustomerAddressApi = (data, customerId, addressId, successCallback, failureCallback, finalCallback) => {
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data);
      // console.log(formData);
      const response = await store(createUpdateCustomerAddress, formData)
      // console.log('customer address create response', response);
      if (response?.data?.SuccessMsg) {
        message.success(response?.data?.Message);
        let resObj = {
          ...data,
          CaId: response?.data?.CreatedId
        }
        if (addressId) {
          successCallback();

        } else {
          successCallback({ data: resObj });

          // dispatch(createAddressSuccess({ data: resObj, customerId: customerId, addressId: response?.data?.CreatedId }))
        }
      } else {
        failureCallback();
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

export const getCustomerDetailApi = (customerId, finalCallback) => {
  let url = `${fetchCustomer}?clientId=${customerId}`;
  return async dispatch => {
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        dispatch(getCustomerDetailSuccess({ data: response?.data?.ClientDetails[0], customerId: customerId }))
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const getAddressListByCustomerIdApi = (customerId, successCallback, finalCallback) => {
  let url = `${getAddressListByCustomerId}?clientId=${customerId}`;
  return async dispatch => {
    try {
      const response = await (fetch(url))
      if (response?.status === 200) {
        successCallback(response?.data?.AddressList)
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const getBillTypeOfCustomerApi = (success, finalCallback) => {
  let url =  `GetBillTypeOfCustomer`;
  return async dispatch => {
    try{
      const response = await (fetch(url))
      if(response?.status === 200){
        success(response?.data?.BillType);
        // dispatch(response?.data)
        // dispatch(createCustomerSuccess({ data: responseObj }))
      }
    }
    catch(error) {

    }
    finally {
      // finalCallback()
    }
  }
}

export const getCustomerDetailForShipping = (customerId,sucesscallback, finalCallback) => {
  let url = `${fetchCustomer}?clientId=${customerId}`;
  return async dispatch => {
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        sucesscallback(getCustomerDetailSuccess({ 
          data: response?.data?.ClientDetails[0], 
          customerId: customerId }))
        
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}