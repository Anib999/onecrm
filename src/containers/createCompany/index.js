import React, { useState, useEffect } from 'react'
import CreateCompanyComponent from '../../components/createCompany';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateCompanyApi, getCompanyDetailApi } from '../../services/companyService';
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import AppSpinner from '../../components/common/spinner';

const CreateCompanyContainer = (props) => {
  const companyId = props?.match?.params?.id;
  const forEdit = props?.forEdit ?? false;
  const companyReducer = useSelector(state => state.company);
  const [previousValues, setPreviousValues] = useState(forEdit ? companyReducer?.company[companyId] : {});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    setPreviousValues(companyReducer?.company[companyId])
  }, [companyReducer?.company[companyId]])

  useEffect(() => {
    if (forEdit) {
      if (previousValues === undefined) {
        setIsLoading(true)
        getCompanyDetail()
      }
    }
  }, [])

  const handleFinish = (values) => {
    let obj = {
      ...values,
      EntryDate: moment().format()
    }
    if (forEdit) {
      obj = {
        CId: companyId,
        ...obj
      }
    }

    dispatch(createUpdateCompanyApi({
      data: obj,
      finalCallback: () => {
        setIsLoading(false)
      },
      successCallback: () => {
        history.goBack();
      }
    }))
  }

  const getCompanyDetail = () => {
    dispatch(getCompanyDetailApi({
      id: companyId,
      finalCallback: () => {
        setIsLoading(false)
      }
    }))
  }


  if (isLoading) {
    return (
      <AppSpinner />
    )
  }

  return (
    <CreateCompanyComponent
      {...props}
      forEdit={forEdit}
      isLoading={isLoading}
      handleFinish={handleFinish}
      companyId={companyId}
      previousValues={previousValues}
    />
  )
}

export default CreateCompanyContainer
