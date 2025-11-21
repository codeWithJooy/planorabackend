const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const orgAuthRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/org", orgAuthRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
