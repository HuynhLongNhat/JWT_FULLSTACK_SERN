import axios from "axios";

const registerNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/register", data);
};

const LoginUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/login", data);
};

const FetchAllUsers = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (user) => {
  return axios.delete(`http://localhost:8080/api/v1/user/delete`, {
    data: {
      id: user.id,
    },
  });
};

const fetchGroup = () => {
  return axios.get("http://localhost:8080/api/v1/group/read");
};

const createNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/user/create", { ...data });
};
export {
  registerNewUser,
  LoginUser,
  FetchAllUsers,
  deleteUser,
  fetchGroup,
  createNewUser,
};
