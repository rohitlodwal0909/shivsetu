const express = require("express");
const router = express.Router();

const PanditController = require("../../controllers/frontend/PanditController");

router.get("/get-pandits", PanditController.getPandits);
router.get("/get-pandits-details/:slug", PanditController.getPanditDetails);

module.exports = router;
