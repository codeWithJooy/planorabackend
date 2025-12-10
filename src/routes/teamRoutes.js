const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

// Routes
router.post("/register", teamController.createMember);
router.get("/member/:orgId", teamController.getMembersByOrgId);
router.get("/:memberId", teamController.getSingleMember);

module.exports = router;
