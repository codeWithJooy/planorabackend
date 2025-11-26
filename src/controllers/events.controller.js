const Events = require("../models/eventModel");

exports.registerEvent = async (req, res) => {
  try {
    const {
      orgId,
      eventName,
      eventType,
      eventLocation,
      eventStart,
      eventEnd,
      eventDescription,
    } = req.body;

    // Validate required fields
    if (
      !orgId ||
      !eventName ||
      !eventType ||
      !eventLocation ||
      !eventStart ||
      !eventEnd ||
      !eventDescription
    ) {
      return res.status(400).json({
        code: 400,
        message: "All fields are required",
      });
    }

    // Create event
    const newEvent = await Events.create({
      orgId,
      eventName,
      eventType,
      eventLocation,
      eventStart,
      eventEnd,
      eventDescription,
    });

    res.status(201).json({
      code: 200,
      message: "Event registered successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().sort({ createdAt: -1 });

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const modifiedEvents = events.map((event) => {
      const eventStartDate = new Date(event.eventStart)
        .toISOString()
        .split("T")[0];

      let status;

      if (eventStartDate > today) {
        status = "Upcoming"; // future date
      } else if (eventStartDate === today) {
        status = "Today"; // same date
      } else {
        status = "Past"; // already happened
      }

      return {
        ...event._doc,
        status,
      };
    });

    res.status(200).json({
      code: 200,
      message: "Events fetched successfully",
      count: modifiedEvents.length,
      events: modifiedEvents,
    });
  } catch (error) {
    console.error("Error fetching events:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Events.findOne({ eventId });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event fetched successfully",
      event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
