import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import getAllBenhNhanReducer from './slice/getAllBenhNhanSlice';
import phieuKhamReducer from './slice/getPhieuKhamSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    benhNhan: getAllBenhNhanReducer,
    phieuKham: phieuKhamReducer,
  },
});

export default store;
