import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// import users from "./api/users.route.js";
import whiskies from "./api/whiskies.route.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use(process.env.API_USERS, users);
app.use("/api/v1/whiskies", whiskies);

app.use("*", (req, res) =>
  res.status(404).json({ error: "Not found, sorry!" })
);

export default app;
