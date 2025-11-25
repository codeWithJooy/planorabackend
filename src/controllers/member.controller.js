const Member = require("../models/teams");

exports.registerMember = async (req, res) => {
  try {
    const { memberName, memberPhone, memberAlternative, memberEmail,orgId } = req.body;

    const existingMember = await Member.findOne({ memberEmail });
    if (existingMember) {
      return res.status(400).json({
        code: 400,
        message: "Member Already Present"
      });
    }

    const newMember = await Member.create({
      memberName,
      memberPhone,
      memberAlternative,
      memberEmail,
      orgId
    });

    return res.status(201).json({
      code: 201,
      message: "Member Added Successfully",
      member: newMember,
    });

  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    return res.status(200).json({
      code: 200,
      message: "Members List Fetched",
      members,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
