const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/User.route");
const { ticketRouter } = require("./Routes/Ticket.route");

app.get("/", (req, res) => {
  res.send("Main Home Page");
});

app.use("/", userRouter);
app.use("/", ticketRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Database Connected Successful");
    console.log(`App Listening on PORT ${process.env.PORT}`);
  } catch (err) {
    console.log("Database Connected Faild");
    console.log(err);
  }
});
