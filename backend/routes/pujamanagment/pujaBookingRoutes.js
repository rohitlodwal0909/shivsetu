const express = require("express");
const router = express.Router();

const BookingController = require("../../controllers/pujamanagment/BookingController");

router.get("/bookings", BookingController.getBookings);

module.exports = router;
