const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events.controller");

router.post("/register", eventController.registerEvent);
router.get("/all", eventController.getAllEvents);
router.get("/:eventId", eventController.getSingleEvent);

module.exports = router;