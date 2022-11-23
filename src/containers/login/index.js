import React, { useState } from 'react';
import Login from '../../components/login'
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { loginApi } from '../../services/profileService';
import { useDispatch } from 'react-redux';

const LoginContainer = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (values) => {
    setLoading(true);
    // localStorage.setItem('accessToken', 'test')
    // history.push('/');
    // message.success('Login Success! Welcome test user')
    dispatch(loginApi({
      data: values,
      finalCallback: () => setLoading(false),
      successCallback: (data) => {
        // console.log('heree', data)
        history.push({
          pathname: '/'
        })
        message.success('Login Success!')
      }
    }
    ));
  }

  return (
    <Login
      handleLogin={handleLogin}
      isLoading={isLoading}
    />
  )
}

export default LoginContainer;