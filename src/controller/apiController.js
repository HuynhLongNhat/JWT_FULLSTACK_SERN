import apiService from "../service/apiService";

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.userName ||
      !req.body.phone ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(200).json({
        EM: "Your password must have more than 6 character",
        EC: "1",
        DT: "",
      });
    }
    //service : create user
    let data = await apiService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(404).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.valueLogin || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    let data = await apiService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(404).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
};
