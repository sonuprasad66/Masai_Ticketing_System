const express = require("express");
const userRouter = express.Router();

const {
  userHome,
  userSignup,
  userLogin,
  userProfile,
} = require("../Controller/User.controller");

const { authentication } = require("../Middleware/authenticate");

userRouter.get("/userHome", userHome);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/profile", authentication, userProfile);

module.exports = {
  userRouter,
};
