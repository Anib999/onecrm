import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const companyEntity = new schema.Entity('company', {}, {
  idAttribute: 'CId'
})
const companyListSchema = new schema.Array(companyEntity);

const initialState = {
  company: {},
  allCompanyId: []
}

const company = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getAllCompanySuccess: (state, action) => {
      const { CompanyDetails } = action.payload;
      let normalizedCompanyData = normalize(CompanyDetails, companyListSchema);
      state.allCompanyId = normalizedCompanyData?.result;
      state.company = normalizedCompanyData?.entities?.company
    },
    getSingleCompanySuccess: (state, action) => {
      const { CompanyDetails } = action.payload;
      state.company[CompanyDetails[0]?.CId] = CompanyDetails[0]
    }
  }
})

export const {
  getAllCompanySuccess,
  getSingleCompanySuccess
} = company.actions;

export default company.reducer;