// app/redux/slice/getAllBenhNhanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllBenhNhanAction = createAsyncThunk(
  'fetchAllBenhNhanAction',
  async () => {
    try {
      const response = await axios.get('/benhnhan/getAll/noMaTK');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchBenhNhanByIdAction = createAsyncThunk(
  "fetchBenhNhanById",
  async (maBN) => {
    try {
      const response = await axios.get(`/benhnhan/getById/${maBN}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  patientById: {},
};

const fetchAllBenhNhanSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBenhNhanAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBenhNhanAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllBenhNhanAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBenhNhanByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientById = action.payload.data;
      });
  },
});

export default fetchAllBenhNhanSlice.reducer;
