import React, { useState, useEffect } from 'react'
import CreateDepartmentComponent from '../../components/createDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppSpinner from '../../components/common/spinner';
import moment from 'moment';
import { createUpdateDepartmentApi } from '../../services/departmentService';

const CreateDepartmentContainer = (props) => {
  const departmentId = props?.match?.params?.id;
  const forEdit = props?.forEdit ?? false;
  const dispatch = useDispatch();
  const history = useHistory();
  const departmentReducer = useSelector(state => state.department);
  const [previousValues, setPreviousValues] = useState(forEdit ? departmentReducer?.departments[departmentId] : {});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (forEdit) {
      if (previousValues === undefined) {
        setIsLoading(true)
        getDepartmentDetail()
      }
    }
  }, [])

  const getDepartmentDetail = () => {

  }

  const handleFinish = (values) => {
    let obj = {
      ...values,
      EnteredDate: moment().format(),
      IsActive: true
    }

    if (forEdit) {
      obj = {
        DId: departmentId,
        ...obj
      }
    }

    dispatch(createUpdateDepartmentApi({
      data: obj,
      finalCallback: () => {
        setIsLoading(false)
      },
      successCallback: () => {
        history.goBack()
      }
    }))

    // console.log('handle finish', values)
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }


  return (
    <CreateDepartmentComponent
      {...props}
      forEdit={forEdit}
      isLoading={isLoading}
      handleFinish={handleFinish}
      departmentId={departmentId}
      previousValues={previousValues}
    />
  )
}

export default CreateDepartmentContainer
