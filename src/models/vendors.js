const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const vendorSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      required: true,
      trim: true,
    },
    vendorId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
    },
    vendorPhone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vendorAlternative: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vendorEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    vendorCategory: {
      type: String,
      required: true,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: null, // will be updated on login
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Vendors", vendorSchema);
