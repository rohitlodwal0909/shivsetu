const express = require("express");
const router = express.Router();

const MarqueeController = require("../../controllers/homemanagment/MarqueeController");

router.post("/create", MarqueeController.create);

router.get("/find", MarqueeController.getMarquees);
router.delete("/delete/:id", MarqueeController.deleteMarquee);

router.put("/update/:id", MarqueeController.update);

module.exports = router;
