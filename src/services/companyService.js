import { fetchCompany } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { message } from 'antd';
import { getAllCompanySuccess, getSingleCompanySuccess } from '../store/slices/companySlice';
import catchErrors from '../utils/catchErrors';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getAllCompanyApi = (params, finalCallback) => {
  return async dispatch => {
    let url = `GetCompanyDetails`;
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        dispatch(getAllCompanySuccess(response?.data))
      }
    }
    catch (error) {
      catchErrors(error, url);
      // console.log('errors here', error)
    }
    finally {
      finalCallback()
    }
  }
}


export const createUpdateCompanyApi = ({ data, finalCallback, successCallback, failureCallback }) => {
  return async dispatch => {
    let url = 'InsertUpdateCompanyDetails';
    try {
      if(data['CompanyAddress2'] == ''){
        data['CompanyAddress2'] = ' '
      }
      if(data['CompanyRegNo'] == '' || data['CompanyRegNo'] == undefined) {
        data['CompanyRegNo'] = '00000'
      }
      const formData = generateUrlEncodedData(data);
      // console.log(data);
      const response = await store(url, formData)
      if (response?.data?.SuccessMsg) {
        successCallback();
        message.success(response?.data?.Message)
      } else {
        message.error(response?.data?.Message)
      }

    }
    catch (error) {
      catchErrors(error, url);
      console.log('error at createupdate', error)
    }
    finally {
      finalCallback()
    }
  }
}


export const getCompanyDetailApi = ({ id, finalCallback }) => {
  return async dispatch => {
    const url = `GetCompanyDetailsById?companyId=${id}`;
    try {
      const response = await fetch(url);

      if (response?.status === 200) {
        dispatch(getSingleCompanySuccess(response?.data))
      }
    }
    catch (error) {
      catchErrors(error, url);
    }
    finally {
      finalCallback()
    }
  }
}