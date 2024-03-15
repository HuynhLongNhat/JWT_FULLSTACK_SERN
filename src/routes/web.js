import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 *
 * express app
 *
 */

const handleHelloWorld = (req, res) => {
  return res.send("hello world");
};
const initApiRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  router.get("/test-api", apiController.testAPI);
  router.post("/register", apiController.handleRegister);
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
