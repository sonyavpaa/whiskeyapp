// const express = require("express");
// const cors = require("cors");

import express from "express";
import cors from "cors";

import users from "./routes/users";
// import whiskies from "./routes/whiskies";

// const mongoose = require("mongoose");
// require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

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

app.use("/api/v1/users", users);
app.use(
  "*",
  (req, (res) => res.status(404).json({ error: "not found, sorry!" }))
);

export default app;

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
