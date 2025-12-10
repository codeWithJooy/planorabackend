const express = require("express");

const {
  registerVendor,
  getVendorsByOrgId
} = require("../controllers/vendors.controller");

const router = express.Router();

router.post("/register", registerVendor);
router.get("/:orgId", getVendorsByOrgId);

module.exports = router;
