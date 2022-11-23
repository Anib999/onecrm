import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import supplierSlice from './slices/supplierSlice';
import customerSlice from './slices/customerSlice';
import profileSlice from './slices/profileSlice';
import productSlice from './slices/productSlice';
import configSlice from './slices/configSlice';
import filterSlice from './slices/filterSlice';
import companySlice from './slices/companySlice';
import departmentSlice from './slices/departmentSlice';

const rootReducer = combineReducers({
  user: userSlice,
  customer: customerSlice,
  supplier: supplierSlice,
  profile: profileSlice,
  product: productSlice,
  config: configSlice,
  filter: filterSlice,
  company: companySlice,
  department: departmentSlice
})

export default rootReducer;
