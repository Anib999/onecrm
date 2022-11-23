import React, { useState, useEffect } from 'react'
import CreateUserComponent from '../../components/createUser';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { createUpdateUserApi, getUserDetailApi } from '../../services/userService';
import VerifyAdminModal from '../../components/verifyAdmin';
import AppSpinner from '../../components/common/spinner';

const CreateUserContainer = (props) => {
  const forEdit = props?.forEdit ?? false;
  const dispatch = useDispatch();
  const history = useHistory();
  const userReducer = useSelector(state => state.user);
  const userId = props?.match?.params?.id;
  const [previousValues, setPreviousValues] = useState(forEdit ? userReducer?.users[userId] : {})
  const [isLoading, setIsLoading] = useState(false)
  const departmentReducer = useSelector(state => state.department);
  const configReducer = useSelector(state => state.config)
  const [userRoles, setUserRoles] = useState(configReducer?.userRoles)
  const [departmentIds, setDeparmentIds] = useState(departmentReducer?.allDepartmentIds)

  useEffect(() => {
    setPreviousValues(userReducer?.users[userId])
  }, [userReducer?.users[userId]])


  useEffect(() => {
    if (forEdit) {
      if (previousValues === undefined) {
        setIsLoading(true)
        getUserDetail()
      }
    }
  }, [])

  const handleFinish = (values) => {
    let obj = {
      ...values,
      CreatedBy: 2,
      AddedDate: moment().format()
    }
    if (forEdit) {
      obj = {
        UId: userId,
        UserPassword: previousValues?.UserPassword,
        ...obj
      }
      obj['IsActive'] = previousValues?.IsActive
    }
    if(obj['Location'] == ''){
      obj['Location'] = ' '
    }
    if(!forEdit){
      //after disabling is active on user page
      obj['IsActive'] = true
    }
    dispatch(createUpdateUserApi({
      data: obj,
      finalCallback: () => {
        setIsLoading(false)
      },
      successCallback: () => {
        history.goBack()
      }
    }))
  }

  const handleDisableUserSuccess = () => {
    history.goBack()

  }

  const getUserDetail = () => {
    dispatch(getUserDetailApi({
      id: userId,
      finalCallback: () => { setIsLoading(false) },
      successCallback: () => { }
    }))
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }

  let departments = [];
  departmentIds?.forEach(item => {
    departments.push(departmentReducer?.departments[item])
  })


  return (
    <>
      <CreateUserComponent
        {...props}
        forEdit={forEdit}
        isLoading={isLoading}
        handleFinish={handleFinish}
        previousValues={previousValues}
        userId={userId}
        userRoles={userRoles}
        departments={departments}
      // setShowAdminModal={setShowIsAdminModal}
      />
      <VerifyAdminModal
        userId={userId}
        handleSuccess={handleDisableUserSuccess}
      />
    </>

  )
}

export default CreateUserContainer
