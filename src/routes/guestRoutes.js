const express = require("express");
const guestController = require("../controllers/guest.controller");

const router = express.Router();

router.post("/bulk-upload", guestController.bulkUploadGuests);
router.post("/add", guestController.addSingleGuest);
router.get("/", guestController.fetchAllGuests);
router.get("/by-sub-event", guestController.fetchBySubEventId);

module.exports = router;
