const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const api = process.env.API_URL;
const mongoose = require("mongoose");
const connect = require("./config/db");

const apiUrl = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// models

const productRoute = require("./router/Product");
const userRoute = require("./router/User");
const categoryRoute = require("./router/Category");

app.use(`${apiUrl}/products`, productRoute);
app.use(`${apiUrl}/users`, userRoute);
app.use(`${apiUrl}/categories`, categoryRoute);

app.listen(3000, () => {
  connect();
  console.log("Server is running on port http://localhost:3000");
});
