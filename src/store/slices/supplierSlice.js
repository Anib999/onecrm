import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
  suppliers: {},
  allSuppliersId: []
}

const supplierEntity = new schema.Entity('supplier', {}, {
  idAttribute: 'supSupplierId'
});
const supplierListSchema = new schema.Array(supplierEntity);

const supplier = createSlice({
  name: 'supplier',
  initialState,
  reducers: {

    getAllSupplierSuccess: (state, action) => {
      const { SupplierDetails } = action.payload;
      let normalizedSupplierData = normalize(SupplierDetails, supplierListSchema);
      state.suppliers = normalizedSupplierData?.entities?.supplier;
      state.allSuppliersId = normalizedSupplierData?.result;
    },

    createSupplierSuccess: (state, action) => {
      const { data } = action.payload;
      let newId = data?.supSupplierId;
      state.allSuppliersId = [newId, ...state.allSuppliersId]
      // state.suppliers = { ...suppliers, ...{ [newId]: { id: newId, ...data } } }
      state.suppliers[newId] = { id: newId, ...data }
    },

    editSupplierSuccess: (state, action) => {
      const { data } = action.payload
      state.suppliers[data?.supSupplierId] = data
    },
    deleteSupplierSuccess: (state, action) => {
      const { id } = action.payload;
      let newIds = state.allSuppliersId.filter(item => item !== id)
      state.allSuppliersId = newIds
    }

  }
})

export const {
  getAllSupplierSuccess,
  createSupplierSuccess,
  editSupplierSuccess,
  deleteSupplierSuccess
} = supplier.actions;

export default supplier.reducer;
