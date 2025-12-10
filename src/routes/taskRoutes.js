const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.controller");

// Add Task
router.post("/add", taskController.addTask);

// Get All Tasks
router.get("/all", taskController.getAllTasks);

// Get tasks by orgId + eventId
router.get("/:orgId/:eventId", taskController.getTaskByOrgAndEvent);

// Get tasks by orgId only
router.get("/org/:orgId", taskController.getTasksByOrgId);

module.exports = router;
