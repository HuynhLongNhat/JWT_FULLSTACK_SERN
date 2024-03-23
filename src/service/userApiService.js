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

const createNewUser = async (data) => {
  try {
    let user = await db.User.create({});
  } catch (error) {
    console.log("check error :", error);
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
    await db.User.delete({
      where: { id: id },
    });
  } catch (error) {}
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
