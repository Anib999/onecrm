import { login } from '../constants/url';
import { store, fetch } from '../utils/httpUtil';
import { storeUserData, storeAuthToken } from '../store/slices/profileSlice';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { message } from 'antd';
// import { message } from 'antd';

export const updateProfileApi = () => {
  return async dispatch => {
    const url = '';
    try {
      const response = await store(url);
      if (response?.data?.SuccessMsg) {

      }
    } catch (error) {

    }
    finally {

    }
  }
}

export const loginApi = ({ data, finalCallback, successCallback }) => {
  // console.log('login api called', data)
  return async dispatch => {
    const url = `ValidUserLogin?username=${data?.username}&password=${data?.password}`;
    // const formData = generateUrlEncodedData(data)
    try {
      const response = await fetch(url);
      // console.log('login response', response)
      if (response?.status === 200) {
        localStorage.setItem('user', JSON.stringify(response?.data?.UserDetails[0]))
        successCallback(response?.data?.UserDetails[0]);
        dispatch(storeUserData(response?.data?.UserDetails[0]))
      }
    } catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const validatePasswordApi = ({ data, finalCallback, successCallback }) => {
  return async dispatch => {
    try {
      const url = `DisableUserByAdmin?loginId=${data?.loginId}&userId=${data?.userId}&password=${data?.password}`
      const response = await store(url);
      // console.log('validate response', response)
      if (response?.status === 200) {
        successCallback();
        message.success('User disabled successfully!')
      }
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}

export const validatePasswordByUserApi = ({ data, finalCallback, successCallback }) => {
  return async dispatch => {
    try {
      const url = `CheckUserPasswordByUserId?id=${data?.loginId}&password=${data?.password}`
      // const url = `GetlistOfClientsByClientId?clientId=0`
      const response = await fetch(url, '');
      // console.log('validate response', response)
      if (response?.status === 200) {
        successCallback(response?.data?.UserPassword[0]?.Result)
        if(response?.data?.UserPassword[0]?.Result == 'OK'){
          message.success('User validated!')
        }else{
          message.success('User not validated! Please try again')
        }
      }
    }
    catch (error) {
      console.log('asdf')
    }
    finally {
      finalCallback()
    }
  }
}