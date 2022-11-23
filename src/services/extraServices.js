import { fetch } from '../utils/httpUtil';
import { statusList, difficultyList, addressList } from '../constants/url';
import { getAddressTypeSuccess, getDifficultyLevelSuccess, getStatusListSuccess } from '../store/slices/configSlice';

export const getStatusListApi = () => {
  return async dispatch => {
    try {
      const response = await fetch(statusList);
      if (response?.status === 200) {
        dispatch(getStatusListSuccess({ data: response?.data?.StatusList }))
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {

    }
  }
}

export const getDifficultyListApi = () => {
  return async dispatch => {
    try {
      const response = await fetch(difficultyList);
      if (response?.status === 200) {
        dispatch(getDifficultyLevelSuccess({ data: response?.data?.DifficultyLevel }))
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {

    }
  }
}

export const getAddressTypeApi = () => {
  return async dispatch => {
    try {
      const response = await fetch(addressList);
      if (response?.status === 200) {
        dispatch(getAddressTypeSuccess({ data: response?.data?.AddressType }))
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      // finalCallback()
    }
  }
}
export const getUserRolesApi = () => {
  //TODO Finish this later
  return async dispatch => {
    try {
      const response = await fetch(addressList);
      if (response?.status === 200) {
        dispatch(getAddressTypeSuccess({ data: response?.data?.AddressType }))
      }
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      // finalCallback()
    }
  }
}