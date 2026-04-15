const express = require("express");
const router = express.Router();

const ReviewController = require("../../controllers/homemanagment/ReviewController");

router.post("/create", ReviewController.create);

router.get("/find", ReviewController.getReviews);
router.delete("/delete/:id", ReviewController.deleteReview);

router.put("/update/:id", ReviewController.update);

module.exports = router;
