const express = require("express");
const ticketRouter = express.Router();

const { createTicket, getTicket } = require("../Controller/Ticket.controller");
const { authentication } = require("../Middleware/authenticate");

ticketRouter.post("/createticket", authentication, createTicket);
ticketRouter.get("/getticket", authentication, getTicket);

module.exports = {
  ticketRouter,
};
