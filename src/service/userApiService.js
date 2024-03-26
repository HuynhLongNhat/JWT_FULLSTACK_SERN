import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (users) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.logy("check error", error);
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offSet = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offSet: offSet,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    let totalPage = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPage,
      users: rows,
    };

    return {
      EM: " fetch Ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Error from server",
      EC: -1,
      DT: "",
    };
  }
};
const createNewUser = async (data) => {
  try {
    let user = await db.User.create({
      username: data.userName,
      password: data.password,
      phone: data.phoneNumber,
      email: data.email,
      address: data.address,
      sex: data.sex,
      groupId: data.groupId,
    });
    if (user) {
      return {
        EM: " create new user success!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Error from server",
      EC: -1,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      //update
      user.save({});
    } else {
      //not found
    }
  } catch (error) {
    console.log("check error :", error);
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "Delete user success",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error : ", error);
    return {
      EM: "Error from service",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getUserWithPagination,
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
