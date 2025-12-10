const express = require("express");
const {
 getVendorsDropdown
} = require("../controllers/dropdown.controller");

const router = express.Router();

router.get("/vendors", getVendorsDropdown);

module.exports = router;