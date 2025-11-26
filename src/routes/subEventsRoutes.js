const express = require("express");
const router = express.Router();
const subEventController = require("../controllers/subevents.controller");

// Register a sub-event
router.post("/register", subEventController.registerSubEvent);

// Get all sub-events
router.get("/all", subEventController.getAllSubEvents);

// Get a single sub-event by subEventId
router.get("/:subEventId", subEventController.getSingleSubEvent);

// Get sub-events by eventId
router.get("/event/:eventId", subEventController.getSubEventsByEventId);

module.exports = router;
