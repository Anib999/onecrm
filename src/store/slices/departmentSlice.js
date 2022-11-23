import { createSlice } from '@reduxjs/toolkit';
import departments from '../../constants/department';
import { normalize, schema } from 'normalizr';

const departmentEntity = new schema.Entity('department', {}, {
  idAttribute: 'DId'
})

const departmentListSchema = new schema.Array(departmentEntity);

const initialState = {
  departments: {},
  allDepartmentIds: []
}

const department = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getAllDepartmentSuccess: (state, action) => {
      const { DepartmentList } = action.payload;
      let normalizedDepartmentData = normalize(DepartmentList, departmentListSchema)
      state.departments = normalizedDepartmentData?.entities.department;
      state.allDepartmentIds = normalizedDepartmentData?.result
    },
    getSingleDepartmentSuccess: (state, action) => {

    },

  }
})

export const {
  getAllDepartmentSuccess,
  getSingleDepartmentSuccess
} = department.actions;

export default department.reducer;