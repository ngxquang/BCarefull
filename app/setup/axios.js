import axios from 'axios';
import {Alert} from 'react-native';
// import { toast } from "react-toastify";
import store from "../redux/store";
// import { useNavigate } from "react-router-dom";

//Create an instance of axios
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

instance.defaults.withCredentials = true;

// instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user?.token}`

//Add a request interceptor
instance.interceptors.request.use(
  config => {
    const bearerToken = `Bearer ${store.getState().auth.user?.token}`;

    config.headers.Accept = 'Application/json';
    config.headers['Content-Type'] = 'Application/json';

    return {
      ...config,
      headers: {
        ...(bearerToken !== null && { Authorization: `${bearerToken}` }),
        ...config.headers,
      },
    };
  },
  error => {
    // return Promise.reject(error);
    console.log('interceptors.request: ', error);
    return false;
  },
);

//Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('>>> error', error);
    const status = error.response?.status || 500;

    switch (status) {
      case 401: {
        Alert.alert('Không xác thực người dùng. Vui lòng đăng nhập...');
        return error.response.data;
      }

      case 403: {
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        return error.response.data;
      }

      case 400: {
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        return error.response.data;
      }

      case 404: {
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        return error.response.data;
      }

      case 409: {
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        return error.response.data;
      }

      case 422: {
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        return error.response.data;
      }
      default: {
        Alert.alert('Lỗi ở server');
        return error.response.data;
      }
    }
  },
);

export default instance;
