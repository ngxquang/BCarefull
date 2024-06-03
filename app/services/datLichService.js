import axios from '../setup/axios';

// Cập nhật giờ đã đặt lịch
export const updateGioDatLich = async data => {
  return axios.post('/datlichthuoc/update', data);
};

// Thêm giờ mới
export const insertGioDatLich = async (maCTDT, thoiGian) => {
  return axios.post('/datlichthuoc/insert', {maCTDT, thoiGian});
};

// Xóa giờ đã đặt lịch
export const deleteGioDatLich = async maGio => {
  return axios.post('/datlichthuoc/delete', {maGio});
};
