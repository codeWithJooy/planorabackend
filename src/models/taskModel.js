const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TaskSchema = new mongoose.Schema(
  {
    orgId: { type: String, required: true },
    eventId: { type: String, required: true },
    subEventId: { type: String, required: true },
    taskId: {
      type: String,
      unique: true,
      default: () => uuidv4()
    },
    taskName: { type: String, required: true },
    taskDescription: { type: String, default: "" },
    taskDue: { type: Date, required: true },
    taskMembers: { type: [String], default: [] }, // array of userIds
    taskVendors: { type: [String], default: [] }, // array of vendorIds
    taskMsgMember: { type: String, default: "" },
    taskMsgVendor: { type: String, default: "" },
    taskStatus: {
      type: String,
      enum: ["Created", "In-Progress", "Completed", "Cancelled"],
      default: "Created",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", TaskSchema);
