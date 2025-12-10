const Events = require("../models/eventModel");

exports.getAllEventsByOrgId = async (req, res) => {
  try {
    const { eventId } = req.query;
    const events=await Events.find().sort({createdAt:-1});
    
  } catch (error) {
    console.error("Failed To Fetch Events");
  }
};
