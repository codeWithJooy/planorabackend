const mongoose = require("mongoose");

const orgDetailsSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      required: true,
      trim: true,
    },
    officialAddress: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    insta: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },
    teamStrength: {
      type: String,
      trim: true,
    },
    externalVendor: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports=mongoose.model("OrgDetails",orgDetailsSchema)