const express = require("express");

const {
  registerMember,
  getMembers,
} = require("../controllers/member.controller");

const router = express.Router();

router.post("/register", registerMember);
router.get("/getmembers", getMembers);

module.exports = router;
