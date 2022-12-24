const express = require("express");
const { ticketModel } = require("../models/Ticket.model");
const { userModel } = require("../Models/User.model");

const createTicket = async (req, res) => {
  const { category, title, message, user_id } = req.body;
  const user = await userModel.findOne({ _id: user_id });
  //   console.log(user.name);

  try {
    const new_Ticket = new ticketModel({
      category: category,
      title: title,
      message: message,
      user_id: user_id,
      username: user.name,
    });

    await new_Ticket.save();
    res.send({ message: "Ticket Created successfully", status: "Success" });
  } catch (err) {
    res.send({ message: "Ticket Created Failed", status: err });
  }
};

const getTicket = async (req, res) => {
  const { user_id } = req.body;
  //   console.log(user_id);
  const ticket = await ticketModel.find({ user_id: user_id });
  res.send(ticket);
};

module.exports = {
  createTicket,
  getTicket,
};
