const Tasks = require("../models/taskModel"); 

// ------------------------
// 1. Add Task
// ------------------------
exports.addTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);

    return res.status(201).json({
      code: 200,
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Add Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// ------------------------
// 2. Get All Tasks
// ------------------------
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().sort({ createdAt: -1 });

    return res.status(200).json({
      code: 200,
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get All Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// ------------------------
// 3. Get Task by orgId + eventId
// ------------------------
exports.getTaskByOrgAndEvent = async (req, res) => {
  try {
    const { orgId, eventId } = req.params;

    const tasks = await Tasks.find({ orgId, eventId });

    return res.status(200).json({
      code: 200,
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get Tasks by Org + Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// ------------------------
// 4. Get Tasks by orgId
// ------------------------
exports.getTasksByOrgId = async (req, res) => {
  try {
    const { orgId } = req.params;

    const tasks = await Tasks.find({ orgId }).sort({ createdAt: -1 });

    return res.status(200).json({
      code: 200,
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get Tasks by OrgId Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};
