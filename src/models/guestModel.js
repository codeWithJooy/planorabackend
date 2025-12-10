const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const guestSchema = new mongoose.Schema(
  {
    orgId: { type: String, required: true },
    eventId: { type: String, required: true },
    guestId: {
      type: String,
      required: true,
      unique: true,
    },
    guestName: { type: String, required: true },
    guestAge: { type: Number, required: true },
    guestPhone: { type: String, required: true },
    guestEmail: { type: String },
    eventIds: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guest", guestSchema);
