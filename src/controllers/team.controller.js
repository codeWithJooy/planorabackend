const Members = require("../models/teams");

// 1️⃣ CREATE MEMBER
exports.createMember = async (req, res) => {
  try {
    const {
      orgId,
      memberName,
      memberPhone,
      memberAlternative,
      memberEmail,
      memberDesignation,
    } = req.body;
   
    if (
      !orgId ||
      !memberName ||
      !memberPhone ||
      !memberAlternative ||
      !memberEmail ||
      !memberDesignation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMember = await Members.create({
      orgId,
      memberName,
      memberPhone,
      memberAlternative,
      memberDesignation,
      memberEmail,
    });

    return res.status(201).json({
      code: 200,
      message: "Member created successfully",
      member: newMember,
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry detected",
        duplicateField: Object.keys(err.keyValue)[0],
      });
    }
    console.log("Done")
    return res.status(500).json({ message:"Wow" });
  }
};

// 2️⃣ GET MEMBERS BY orgId
exports.getMembersByOrgId = async (req, res) => {
  try {
    const { orgId } = req.params;

    const members = await Members.find({ orgId: orgId.toString() });

    return res.status(200).json({
      code: 200,
      message: "Members fetched successfully",
      members,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3️⃣ GET SINGLE MEMBER (by memberId)
exports.getSingleMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Members.findOne({ memberId });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({
      message: "Member fetched successfully",
      member,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
