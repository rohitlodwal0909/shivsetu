const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const CabController = require("../../controllers/tourmanagment/CabController");

/* ================= CREATE CAB ================= */
router.post(
    "/create",
    upload.fields([{ name: "icon", maxCount: 1 }]),
    CabController.createCab,
);

/* ================= GET ALL CABS ================= */
router.get("/find", CabController.getCab);

/* ================= DELETE CAB ================= */
router.delete("/delete/:id", CabController.deleteCab);

/* ================= UPDATE CAB ================= */
router.put(
    "/update/:id",
    upload.fields([{ name: "icon", maxCount: 1 }]),
    CabController.updateCab,
);

/* ================= UPDATE STATUS ================= */
router.put("/updatestatus/:id", CabController.updateCabStatus);

module.exports = router;
