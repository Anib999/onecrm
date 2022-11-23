import { } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { getAllUsersSuccess, getSingleUserSuccess } from '../store/slices/userSlice';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { message } from 'antd';
import { storeUserData } from '../store/slices/profileSlice';

export const getAllUserApi = (params, finalCallback) => {
  return async dispatch => {
    try {
      const url = `GetListOfAllUserDetails`;
      const response = await fetch(url);
      if (response?.status === 200) {
        dispatch(getAllUsersSuccess(response?.data))
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      finalCallback();
    }
  }
}

export const createUpdateUserApi = ({ data, finalCallback, successCallback }) => {
  return async dispatch => {
    const url = 'InsertUpdateAppUsers';
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store(url, formData)
      if (response?.data?.SuccessMsg) {
        successCallback()
        message.success(response?.data?.Message)
        return;
      }
      message.error(response?.data?.Message)
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const getUserDetailApi = ({ id, ownProfile, finalCallback }) => {
  return async dispatch => {
    const url = `GetActiveUserById?userId=${id}`;
    try {
      const response = await fetch(url)
      if (response?.status === 200) {
        if (ownProfile) {
          console.log('here')
          dispatch(storeUserData(response?.data?.UserDetails[0]))
        }
        dispatch(getSingleUserSuccess(response?.data))
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const changeUserPasswordApi = ({ data, finalCallback, successCallback }) => {
  return async dispatch => {
    const url = `ChangeUserPassword?loginId=${data?.loginId}&password=${data?.password}&userId=${data?.userId}`;
    try {
      const response = await store(url);
      if (response?.status === 200) {
        successCallback()
        message.success('Password changed Successfully')
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const getUserCustomerApi = (params, finalCallback) => {
  return async dispatch => {
    try {
      const url = `GetListOfAllUserDetails`;
      const response = await fetch(url);
      if (response?.status === 200) {
        params(response?.data?.UserDetails)
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      // finalCallback();
    }
  }
}