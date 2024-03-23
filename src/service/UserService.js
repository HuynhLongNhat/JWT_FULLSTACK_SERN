import axios from "axios";

const registerNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/register", data);
};

const LoginUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/login", data);
};

const FetchAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1/user/read");
};
export { registerNewUser, LoginUser, FetchAllUsers };
