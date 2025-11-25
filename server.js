const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cors = require("cors");

const orgAuthRoutes = require("./src/routes/authRoutes");
const vendorRoutes=require("./src/routes/vendorRoutes");
const memberRoutes=require("./src/routes/memberRoutes")

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/org", orgAuthRoutes);
app.use("/api/vendors",vendorRoutes);
app.use("/api/members",memberRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
