import React, { useState, useEffect } from 'react'
import AccountComponent from '../../components/account';
import AccountLayout from '../../layout/accountLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailApi } from '../../services/userService';
import AppSpinner from '../../components/common/spinner';
import { createUpdateUserApi } from '../../services/userService';

const AccountContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const profileReducer = useSelector(state => state.profile);
  const userReducer = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userId = profileReducer?.userData?.UId
  const [userData, setUserData] = useState(profileReducer?.userData)


  useEffect(() => {
    setUserData(profileReducer?.userData)
  }, [profileReducer?.userData])


  useEffect(() => {
    setIsLoading(true)
    getUserDetails()
  }, [])

  const handleFinish = (values) => {
    let obj = {
      ...userData,
      ...values
    }
    dispatch(createUpdateUserApi({
      data: obj,
      finalCallback: () => { },
      successCallback: () => { }
    }))
    // console.log('handleFinish', obj)
  }

  const getUserDetails = () => {
    dispatch(getUserDetailApi({
      id: userId,
      finalCallback: () => {
        setIsLoading(false)
      },
      ownProfile: true
    }))
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }

  return (
    <AccountLayout>
      <AccountComponent
        handleFinish={handleFinish}
        userId={userId}
        userData={userData}
      />
    </AccountLayout>
  )
}

export default AccountContainer
