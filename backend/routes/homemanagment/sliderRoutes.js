const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const SliderController = require("../../controllers/homemanagment/SliderController");

router.post(
    "/create",
    upload.fields([{ name: "image", maxCount: 1 }]),
    SliderController.create,
);

router.get("/find", SliderController.getSliders);
router.delete("/delete/:id", SliderController.deleteSlider);

router.put(
    "/update/:id",
    upload.fields([{ name: "image", maxCount: 1 }]),
    SliderController.update,
);

module.exports = router;
