import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllGioDatLichAction = createAsyncThunk(
  'fetchAllGioDatLichAction',
  async () => {
    try {
      const response = await axios.get('/datlichthuoc/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
