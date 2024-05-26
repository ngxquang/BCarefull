import { createSlice } from '@reduxjs/toolkit';
import { fetchDsClsByIdAction, fetchAllClsAction } from '../action/fetchCLSAction';

const initialState = {
  dsClsById: [],
  status: "",
  loading: false,
  allCls: [],
};

const fetchCLSSlice = createSlice({
  name: 'CLS',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDsClsByIdAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchDsClsByIdAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.dsClsById = action.payload.data;
      })
      .addCase(fetchDsClsByIdAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      })
      .addCase(fetchAllClsAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAllClsAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.allCls = action.payload.data;
      })
      .addCase(fetchAllClsAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      })
  },
});

export default fetchCLSSlice.reducer;
