import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import phieuKhamReducer from './slice/getPhieuKhamSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    phieuKham: phieuKhamReducer,
  },
});

export default store;
