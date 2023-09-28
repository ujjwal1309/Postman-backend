const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const authentication = require("./middleware/authentication");
const { historyRouter } = require("./routes/history.route");

app.get("/", (req, res) => {
  res.send({ msg: "Welcome" });
});

app.get("/logout", async (req, res) => {
  // Log out the user
  const token = req.headers?.authorization?.split(" ")[1];
  // await redis.sadd("blacklisted", token);
  res.send({ msg: "logged out successfully" });
});

app.use("/user", userRouter);

app.use(authentication);

app.use("/query", historyRouter);

app.listen(7000, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
    console.log("Listening on port 7000");
  } catch (err) {
    console.log(err);
    console.log("Connection failed to db");
  }
});
