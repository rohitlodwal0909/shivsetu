const express = require("express");
const router = express.Router();

const HomeController = require("../../controllers/frontend/HomeController");

router.get("/get-marquee", HomeController.getMarquee);
router.get("/get-all-data", HomeController.getAllHomedata);

module.exports = router;
