const express = require("express");

const {
  registerVendor,
  getVendors,
} = require("../controllers/vendors.controller");

const router = express.Router();

router.post("/register", registerVendor);
router.get("/getvendors", getVendors);

module.exports = router;
