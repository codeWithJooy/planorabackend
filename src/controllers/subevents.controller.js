const SubEvents = require("../models/subEventModel");

// -----------------------------------------
// 1. REGISTER SUB-EVENT
// -----------------------------------------
exports.registerSubEvent = async (req, res) => {
  try {
    const {
      orgId,
      eventId,
      subEventName,
      subEventType,
      subEventLocation,
      subEventStartDate,
      subEventStartTime,
      subEventEndDate,
      subEventEndTime,
      subEventDescription,
      subEventMembers,
      subEventVendors,
    } = req.body;

    // Basic validation
    if (
      !orgId ||
      !eventId ||
      !subEventName ||
      !subEventType ||
      !subEventLocation ||
      !subEventStartDate ||
      !subEventStartTime ||
      !subEventEndDate ||
      !subEventEndTime ||
      !subEventDescription
    ) {
      return res.status(400).json({
        message: "All required fields must be provided.",
      });
    }

    const newSubEvent = await SubEvents.create({
      orgId,
      eventId,
      subEventName,
      subEventType,
      subEventLocation,
      subEventStartDate,
      subEventStartTime,
      subEventEndDate,
      subEventEndTime,
      subEventDescription,
      subEventMembers: subEventMembers || [],
      subEventVendors: subEventVendors || [],
    });

    res.status(201).json({
      code: 200,
      message: "Sub-event registered successfully",
      subEvent: newSubEvent,
    });
  } catch (error) {
    console.error("Error creating sub-event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// -----------------------------------------
// 2. GET ALL SUB-EVENTS
// -----------------------------------------
exports.getAllSubEvents = async (req, res) => {
  try {
    const subEvents = await SubEvents.find().sort({ createdAt: -1 });

    res.status(200).json({
      code: 200,
      message: "Sub-events fetched successfully",
      count: subEvents.length,
      subEvents,
    });
  } catch (error) {
    console.error("Error fetching sub-events:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// -----------------------------------------
// 3. GET SUB-EVENT BY subEventId
// -----------------------------------------
exports.getSingleSubEvent = async (req, res) => {
  try {
    const { subEventId } = req.params;

    const subEvent = await SubEvents.findOne({ subEventId });

    if (!subEvent) {
      return res.status(404).json({
        message: "Sub-event not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Sub-event fetched successfully",
      subEvent,
    });
  } catch (error) {
    console.error("Error fetching subEvent:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// -----------------------------------------
// 4. GET SUB-EVENTS BY eventId
// -----------------------------------------
exports.getSubEventsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const subEvents = await SubEvents.find({ eventId });

    res.status(200).json({
      code: 200,
      message: "Sub-events fetched successfully",
      count: subEvents.length,
      subEvents,
    });
  } catch (error) {
    console.error("Error fetching subEvents:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
