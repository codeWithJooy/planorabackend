const Guest=require("../models/guestModel.js")
const { v4: uuidv4 } = require("uuid");

/*
===========================================
1. BULK UPLOAD GUESTS (guest array from client)
===========================================
Expected payload:
{
  "orgId": "ORG1",
  "eventId": "E001",
  "guests": [
    {
      "guestName": "",
      "guestAge": 22,
      "guestPhone": "",
      "guestEmail": ""
    }
  ]
}
*/
exports.bulkUploadGuests = async (req, res) => {
  try {
    const { orgId, eventId, guests } = req.body;

    if (!guests || !Array.isArray(guests)) {
      return res.status(400).json({ error: "Guests must be an array" });
    }

    const formattedGuests = guests.map((g) => ({
      orgId,
      eventId,
      guestId: uuidv4(),
      guestName: g.Name,
      guestAge: g.Age,
      guestPhone: g.Phone,
      guestEmail: g.Email || "",
      eventIds: [eventId],
    }));

    await Guest.insertMany(formattedGuests);

    res.status(201).json({
      code: 200,
      message: "Bulk guests uploaded successfully",
      total: formattedGuests.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bulk upload failed" });
  }
};

/*
===========================================
2. ADD A SINGLE GUEST
===========================================
Payload:
{
  "orgId": "",
  "eventId": "",
  "guestName": "",
  "guestAge": 22,
  "guestPhone": "",
  "guestEmail": ""
}
*/
exports.addSingleGuest = async (req, res) => {
  try {
    const { orgId, eventId, guestName, guestAge, guestPhone, guestEmail } =
      req.body;

    const newGuest = new Guest({
      orgId,
      eventId,
      guestId: uuidv4(),
      guestName,
      guestAge,
      guestPhone,
      guestEmail,
      eventIds: [eventId],
    });

    await newGuest.save();

    res.status(201).json({
      code: 200,
      message: "Guest added successfully",
      guest: newGuest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add guest" });
  }
};

/*
===========================================
3. FETCH ALL GUESTS (optional orgId/eventId filters)
===========================================
Example:
GET /guests?orgId=ORG1&eventId=E001
*/
exports.fetchAllGuests = async (req, res) => {
  try {
    const { orgId, eventId } = req.query;

    const filter = {};
    if (orgId) filter.orgId = orgId;
    if (eventId) filter.eventId = eventId;

    const guests = await Guest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ code: 200, guests: guests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
};

/*
===========================================
4. FETCH GUESTS BASED ON subEventIds
===========================================
Example:
GET /guests/by-sub-event?eventId=E002

eventIds: ["E001", "E002"]
*/
exports.fetchBySubEventId = async (req, res) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res.status(400).json({ error: "eventId is required" });
    }

    const guests = await Guest.find({
      eventIds: { $in: [eventId] },
    }).sort({ createdAt: -1 });

    res.status(200).json({ code: 200, guests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch guests by subEventId" });
  }
};
