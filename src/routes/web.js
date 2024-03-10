import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/**
 *
 * express app
 *
 */

const handleHelloWorld = (req, res) => {
  return res.send("hello world");
};
const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);

  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  return app.use("/", router);
};

export default initWebRoutes;
