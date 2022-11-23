import { fetchCompany } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { message } from 'antd';
import { getAllDepartmentSuccess, getSingleDepartmentSuccess } from '../store/slices/departmentSlice';
import catchErrors from '../utils/catchErrors';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getAllDepartmentApi = (params, finalCallback) => {
  return async dispatch => {
    let url = `GetDepartments`;
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        dispatch(getAllDepartmentSuccess(response?.data))
      }
    }
    catch (error) {
      catchErrors(error, url);
      console.log('errors here', error)
    }
    finally {
      finalCallback()
    }
  }
}


export const createUpdateDepartmentApi = ({ data, finalCallback, successCallback, failureCallback }) => {
  return async dispatch => {
    let url = 'InsertUpdateDepartment';
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store(url, formData)
      // console.log('response', response)
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


export const getDepartmentDetailApi = ({ id, finalCallback }) => {
  return async dispatch => {
    const url = `GetDepartmentDetailById?departmentId=${id}`;
    try {
      const response = await fetch(url);

      if (response?.status === 200) {
        dispatch(getSingleDepartmentSuccess(response?.data))
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