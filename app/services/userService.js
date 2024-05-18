import axios from "../setup/axios";

export const loginUser = (phoneNumber, password) => {
  return axios.post("/account/login", {
    phoneNumber,
    password,
  });
};

export const registerUser = (phoneNumber, password) => {
    return axios.post("/account/register", {
      phoneNumber,
      password,
    });
  };

// export const changeUserPassword = (username, oldPassword, newPassword) => {
//   return axios.post("/account/changePassword", {
//     username,
//     oldPassword,
//     newPassword
//   });
// };

// export const logoutUser = () => {
//   return axios.post("/account/logout");
// };
