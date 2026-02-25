const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const PujaPackageController = require("../../controllers/pujamanagment/PujaPackageController");

router.post(
    "/create",
    upload.fields([{ name: "image", maxCount: 1 }]),
    PujaPackageController.create,
);
router.get("/find", PujaPackageController.getPujaPackage);
router.delete("/delete/:id", PujaPackageController.deletePujaPackage);
router.put(
    "/update/:id",
    upload.fields([{ name: "image", maxCount: 1 }]),
    PujaPackageController.update,
);

module.exports = router;
