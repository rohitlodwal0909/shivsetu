const express = require("express");
const router = express.Router();

const LocationController = require("../../controllers/location/LocationController");

router.get("/getstate", LocationController.getState);
router.get("/getCity/:stateId", LocationController.getCity);

module.exports = router;
