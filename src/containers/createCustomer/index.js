import React, { useState, useEffect } from 'react';
import CreateCustomerComponent from '../../components/createCustomer';
import { useDispatch, useSelector } from 'react-redux'
import { createUpdateCustomerApi, getCustomerDetailApi, getAddressListByCustomerIdApi, getBillTypeOfCustomerApi } from '../../services/customerService';
import { getUserCustomerApi } from '../../services/userService';
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment';
import AppSpinner from '../../components/common/spinner';

const CreateCustomercontainer = (props) => {
  const forEdit = props?.forEdit ?? false;
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const customerId = props?.match?.params?.id
  const customerReducer = useSelector(state => state.customer);
  const [isLoading, setLoading] = useState(false);
  const [previousValues, setPreviousValues] = useState(forEdit ? customerReducer?.customers[customerId] : {});
  const [addAddress, setAddAddress] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [showAddressModal, setAddressModal] = useState(false);
  const [billList, setbillList] = useState([]);
  const [allUser, setallUser] = useState([]);

  useEffect(() => {
    if (forEdit) {
      getCustomerAddress()
      if (previousValues === undefined) {
        setLoading(true);
        getCustomerDetail();
      }
    }
    getBillTypeOfCustomer()
    getAllUsers()
  }, [])

  useEffect(() => {
    setPreviousValues(customerReducer?.customers[customerId]);
  }, [customerReducer?.customers[customerId]])

  // useEffect(() => {
  //   console.log('changes in address list')
  // }, [customerReducer?.customers[customerId]?.AddressList])

  const handleFinish = (values) => {
    let obj = {
      ...values,
      cltAddedDate: moment().format(),
      cltIsEnabled: true,
      cltAddedUserId: 2,
      cltClientTags: values?.cltClientTags ?? '',
      cltClientNotes: values?.cltClientNotes ?? ''
    }
    // console.log('objj', obj)
    // return;
    if (forEdit) {
      obj = { cltClientId: customerId, ...obj }
    }
    dispatch(createUpdateCustomerApi(obj,
      customerId,
      (response) => {
        // console.log('create customer success--')
        if (addAddress) {
          history.replace({
            pathname: `/customers/edit/${response?.CreatedId}`,
            // openAddressModal: true
          })
          setAddressModal(true)
        } else {
          history.goBack()
        }
      },
      () => { setLoading(false) }))
  }

  // console.log('propss check--', props)
  const getCustomerDetail = () => {
    dispatch(getCustomerDetailApi(customerId,
      () => {
        setLoading(false);
        //finalCallback
      }))
  }

  const getCustomerAddress = () => {
    dispatch(getAddressListByCustomerIdApi(customerId,
      (response) => {
        setAddressList(response)
      },
      () => { }))
  }

  const getBillTypeOfCustomer = () => {
    dispatch(getBillTypeOfCustomerApi( (response) => {
      setbillList(response)
    } ))
  }

  const handleCreateUpdateAddressSuccess = (response) => {
    getCustomerAddress()
    // setAddressList([...addressList, response?.data])
  }
 
  const getAllUsers = () => {
    dispatch(getUserCustomerApi( (res) => {
      var ids = res.reduce((ids, thing) => {
        if (thing.IsActive) {
          ids.push({'uid': thing.UId, 'name': thing.FullName});
        }
        return ids;
      }, []);
      setallUser(ids)
    } ))
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }
  return (
    <CreateCustomerComponent
      {...props}
      forEdit={forEdit}
      isLoading={isLoading}
      handleFinish={handleFinish}
      supplierReducer={customerReducer}
      previousValues={previousValues}
      customerId={customerId}
      setAddAddress={setAddAddress}
      addAddress={addAddress}
      addressList={addressList}
      createUpdateAddressSuccess={handleCreateUpdateAddressSuccess}
      setAddressModal={setAddressModal}
      showAddressModal={showAddressModal}
      billType={billList}
      allUsers={allUser}
    />
  )
}

export default CreateCustomercontainer;