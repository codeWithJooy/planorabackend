const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const subEventSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      required: true,
    },

    eventId: {
      type: String,
      required: true,
    },

    subEventId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },

    subEventName: {
      type: String,
      required: true,
    },

    subEventType: {
      type: String,
      required: true,
    },

    subEventLocation: {
      type: String,
      required: true,
    },

    subEventStartDate: {
      type: String,
      required: true,
    },

    subEventStartTime: {
      type: String,
      required: true,
    },

    subEventEndDate: {
      type: String,
      required: true,
    },

    subEventDescription: {
      type: String,
      required: true,
    },

    subEventMembers: {
      type: [String], // Array of Member IDs
      default: [],
    },

    subEventVendors: {
      type: [String], // Array of Vendor IDs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubEvents", subEventSchema);
