import { createSlice } from '@reduxjs/toolkit';
import AddressType from '../../constants/addressType';
import DifficultyLevel from '../../constants/difficultyLevel';
import StatusList from '../../constants/statusList';
import UserRolesList from '../../constants/userRoles';

const initialState = {
  addressType: AddressType,
  difficultyLevel: DifficultyLevel,
  statusList: StatusList,
  userRoles: UserRolesList,
  showVerifyAdminModal: false,
  isForEnableUser: false,
  isCustomerData: {},
  isFromCustomer: false
}

const configs = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    getAddressTypeSuccess: (state, action) => {
      const { data } = action.payload
      state.addressType = data
    },
    getDifficultyLevelSuccess: (state, action) => {
      const { data } = action.payload;
      state.difficultyLevel = data
    },
    getStatusListSuccess: (state, action) => {
      const { data } = action.payload;
      state.statusList = data
    },
    getUserRoleSuccess: (state, action) => {
      const { data } = action.payload;
      state.UserRoles = data
    },
    toggleVerifyAdminModal: (state, action) => {
      state.showVerifyAdminModal = !state.showVerifyAdminModal;
      state.isForEnableUser = action?.payload?.forEnableUser;

      state.isFromCustomer = action?.payload?.fromHere;
      if(state.isFromCustomer == true){
        state.isCustomerData = action?.payload?.oData;
        state.isForEnableUser = false
      }
      
    }
  }
})

export const {
  getAddressTypeSuccess,
  getDifficultyLevelSuccess,
  getStatusListSuccess,
  toggleVerifyAdminModal
} = configs.actions;

export default configs.reducer;