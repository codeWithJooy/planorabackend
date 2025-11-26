const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const eventSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      unique: true,
      required: true,
    },
    eventId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    eventStart: {
      type: String,
      required: true,
    },
    eventEnd: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", eventSchema);
