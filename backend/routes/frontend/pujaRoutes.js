const express = require("express");
const router = express.Router();

const PujaController = require("../../controllers/frontend/PujaController");

router.get("/get-puja", PujaController.getPuja);
router.get("/get-puja-details/:slug", PujaController.getPujaDetails);
router.post("/book", PujaController.bookPuja);

module.exports = router;
