const express = require("express");
const router = express.Router();

const ProductController = require("../../controllers/frontend/ProductController");

router.get("/get-shop", ProductController.getProducts);
router.get("/product/:slug", ProductController.getProductWithSlug);

module.exports = router;
