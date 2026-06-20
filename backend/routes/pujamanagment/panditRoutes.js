const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const PanditController = require("../../controllers/pujamanagment/PanditController");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  PanditController.create
);

router.get("/find", PanditController.getPandits);
router.delete("/delete/:id", PanditController.deletePandit);

router.put(
  "/update/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  PanditController.update
);

module.exports = router;
