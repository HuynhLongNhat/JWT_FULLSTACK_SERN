import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index.js";
//hash password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  //dung ORM SEQUELIZE_CLI
  let hashPassword = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log("Check error :", error);
  }
};

const getUserList = async () => {
  let users = [];

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute("Select * from users");
    return row;
  } catch (error) {
    console.log("check error:", error);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [row, fields] = await connection.execute(
      "Delete from  users where id =? ",
      [id]
    );
    return row;
  } catch (error) {
    console.log("check error:", error);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [row, fields] = await connection.execute(
      "Select * from  users where id =? ",
      [id]
    );
    return row;
  } catch (error) {
    console.log("check error:", error);
  }
};

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [row, fields] = await connection.execute(
      "Update  users  set email =? , username = ? where id=?",
      [email, username, id]
    );
    return row;
  } catch (error) {
    console.log("check error:", error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
