import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: {}, // Đối tượng lưu trữ thông tin hàng được chọn
  selectedItemThanhToan: {},
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload; // Cập nhật thông tin hàng được chọn
    },
    clearSelectedItem: (state) => {
      state.selectedItem = {}; // Xóa thông tin hàng được chọn
    },
    selectItemThanhToan: (state, action) => {
      state.selectedItemThanhToan = action.payload; // Cập nhật thông tin hàng được chọn
    },
    clearSelectedItemThanhToan: (state) => {
      state.selectedItemThanhToan = {}; // Xóa thông tin hàng được chọn
    },
  },
});

export const { selectItem, clearSelectedItem, selectItemThanhToan, clearSelectedItemThanhToan } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
