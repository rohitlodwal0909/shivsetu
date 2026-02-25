const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const PackageController = require("../../controllers/tourmanagment/PackageController");

router.post(
    "/create",
    upload.fields([
        { name: "banner_image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    PackageController.create,
);

router.get("/find", PackageController.getPackage);
router.delete("/delete/:id", PackageController.deletePackage);

router.put(
    "/update/:id",
    upload.fields([
        { name: "banner_image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    PackageController.update,
);

router.put("/updatestatus/:id", PackageController.updatestatus);

module.exports = router;
