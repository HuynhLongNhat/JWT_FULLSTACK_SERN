import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
//hash password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email , password, username) VALUES (? , ? , ? )",
    [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
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
module.exports = {
  createNewUser,
  getUserList,
};
