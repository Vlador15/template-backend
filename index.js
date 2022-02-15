// connect mongoDB
require("./models/connect");

const express = require("express");
const app = express();
const cors = require("cors");

// config
const config = require("config");
const PORT = config.get("port");

// controllers
const authRouter = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
