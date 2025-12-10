const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const memberSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      required: true,
      trim: true,
    },
    memberId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    memberName: {
      type: String,
      required: true,
      trim: true,
    },
    memberPhone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    memberAlternative: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    memberDesignation:{
      type:String,
      required:true,
      trim:true,
    },
    memberEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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

module.exports = mongoose.model("Members", memberSchema);
