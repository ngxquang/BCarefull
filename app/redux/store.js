import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import getAllBenhNhanReducer from './slice/getAllBenhNhanSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    benhNhan: getAllBenhNhanReducer,
  },
});

export default store;
