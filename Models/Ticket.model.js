const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    category: { type: String, require: true },
    title: { type: String, require: true },
    message: { type: String, require: true },
    user_id: { type: String, require: true },
    username: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ticketModel = new mongoose.model("ticket", ticketSchema);

module.exports = {
  ticketModel,
};
