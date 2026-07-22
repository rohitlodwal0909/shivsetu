const express = require("express");
const router = express.Router();

const HomeController = require("../../controllers/frontend/HomeController");

router.get("/get-marquee", HomeController.getMarquee);
router.get("/get-all-data", HomeController.getAllHomedata);
router.get("/tours", HomeController.getTours);
router.get("/singletour/:id", HomeController.singleTour);

router.get("/cabs", HomeController.getCabs);
router.get("/singlecab/:id", HomeController.singlecab);

router.get("/get-reviews/:type", HomeController.getReviews);
// jj

module.exports = router;
