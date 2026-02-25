const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const PujaController = require("../../controllers/pujamanagment/PujaController");

router.post(
    "/create",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    PujaController.create,
);
router.get("/find", PujaController.getPuja);
router.get("/findByslug/:slug", PujaController.getPujaBySlug);

router.delete("/delete/:id", PujaController.deletePuja);
router.put(
    "/update/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    PujaController.update,
);

module.exports = router;
