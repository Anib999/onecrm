import { BASE_URL } from '../constants/url';
import axios from 'axios';
import { message } from 'antd'

export const httpBase = () => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain',
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*'
  }

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: headers
  })

  instance.interceptors.response.use(
    response => {
      // console.log('api response', response);
      return response
    },
    error => {
      message.error(error?.message+'. Data Not Found. Please try again later.')
      return error?.message;
      // message.error(error?.message)
    }
  );

  return instance;
}