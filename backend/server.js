// const express = require("express");
// const cors = require("cors");

// const mongoose = require("mongoose");
// require("dotenv").config();

import express from "express";
import cors from "cors";
import users from "./api/users.route.js";
import whiskies from "./api/whiskies.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/whiskies", whiskies);

// const port = process.env.PORT || 5001;

app.use("*", (req, res) =>
  res.status(404).json({ error: "Not found, sorry!" })
);

export default app;

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established succesfully!");
// });

// const usersRouter = require("./routes/users");
// const whiskiesRouter = require("./routes/whiskies");

// app.use("/users", usersRouter);
// app.use("/whiskies", whiskiesRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
