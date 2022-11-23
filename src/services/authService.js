import { login } from '../constants/url';
import { store } from '../utils/httpUtil';
// import { storeUserData, storeAuthToken } from '../store/slices/userSlice';
// import { message } from 'antd';

export const loginApi = (data, finalCallback) => {
  return dispatch => {
    try {
      const response = store(login, JSON.stringify(data))
      if (response.success) {

      } else {

      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const forgotPasswordApi = () => {
  return async dispatch => {
    const url = '';
    try {
      const response = store(url);

      if (response?.data?.SuccessMsg) {

      }
    } catch (error) {

    }
    finally {

    }
  }
}