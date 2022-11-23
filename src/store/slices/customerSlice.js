import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
  customers: {},
  allCustomersId: [],
}

const customerEntity = new schema.Entity('customer', {}, {
  idAttribute: 'cltClientId'
});
const customerListSchema = new schema.Array(customerEntity);


const customer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getAllCustomerSuccess: (state, action) => {
      const { ClientDetails } = action.payload;
      let normalizedCustomerData = normalize(ClientDetails, customerListSchema)
      // console.log('normalized', normalizedCustomerData)
      state.allCustomersId = normalizedCustomerData.result;
      state.customers = normalizedCustomerData.entities.customer
      // state.customers = action.payload?.ClientDetails
      // state.allCustomers = ClientDetails
    },

    createCustomerSuccess: (state, action) => {
      const { data } = action.payload;
      let newId = data?.cltClientId;
      state.allCustomersId = [newId, ...state.allCustomersId]
      state.customers[newId] = { id: newId, ...data }
    },

    editCustomerSuccess: (state, action) => {
      const { data } = action.payload;
      state.customers[data?.cltClientId] = data
    },
    deleteCustomerSuccess: (state, action) => {
      const { id } = action.payload;
      let newIds = state.allCustomersId.filter(item => item !== id)
      state.allCustomersId = newIds
    },
    getCustomerDetailSuccess: (state, action) => {
      const { data, customerId } = action.payload;
      state.customers[customerId] = data;
      state.allCustomersId = [...state.allCustomersId, customerId]
    },
    createAddressSuccess: (state, action) => {
      const { data, customerId } = action.payload;
      state.customers[customerId] = {
        ...state.customers[customerId],
        AddressList: [
          data
          // ...state?.customers[customerId]?.AddressList
        ]
      }
    },
    editAddressSuccess: (state, action) => {
      // const { data, customerId, addressId } = action.payload;


    }

  }
})

export const {
  getAllCustomerSuccess,
  createCustomerSuccess,
  editCustomerSuccess,
  deleteCustomerSuccess,
  getCustomerDetailSuccess,
  createAddressSuccess,
  editAddressSuccess
} = customer.actions;

export default customer.reducer;
