import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {}
}

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange: (state, action) => {
      const { filters } = action.payload
      state.filters = filters
    }
  }
})

export const {
  filterChange
} = filter.actions;

export default filter.reducer;