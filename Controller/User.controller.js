const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../Models/User.model");

const userHome = (req, res) => {
  res.send("user home page");
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const date = new Date();
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.send({
        message: "User already exists! Please Try to Login",
        status: "Exist",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash_password) => {
        if (err) {
          res.send({ message: "Something went wrong", status: "Failed" });
        } else {
          const new_user = new userModel({
            name: name,
            email: email,
            password: hash_password,
            date: date,
          });
          await new_user.save();
          res.send({ message: "Signup Successfull", status: "Success" });
        }
      });
    }
  } catch (err) {
    res.send({ message: "Something went wrong", status: "Error" });
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;

  bcrypt.compare(password, hashed_password, async (err, result) => {
    if (err) {
      res.send({ message: "Something went wrong", status: "Error" });
    } else {
      if (result) {
        let token = jwt.sign({ user_id }, process.env.SECRET_KEY);
        res.send({ message: "Login successful", token: token });
      } else {
        res.send({ message: "Login failed", status: "Failed" });
      }
    }
  });
};

const userProfile = async (req, res) => {
  const { user_id } = req.body;
  const currentUser = await userModel.findOne({ _id: user_id });
  res.send(currentUser);
};

module.exports = {
  userHome,
  userSignup,
  userLogin,
  userProfile,
};
