const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");


const orgSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    orgPhone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    orgEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    orgPassword: {
      type: String,
      required: true, // hashed password
    },
    type: {
      type: String,
      enum: ["company", "startup", "enterprise", "other"],
      default: "company",
    },
    status: {
      type: String,
      enum: ["new", "onboarded"],
      default: "new",
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

module.exports = mongoose.model("Org", orgSchema);
