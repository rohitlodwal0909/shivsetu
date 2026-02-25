const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const ProductController = require("../../controllers/productmanagment/ProductController");

router.post(
    "/create",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    ProductController.create,
);

router.get("/find", ProductController.getProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

router.put(
    "/update/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    ProductController.update,
);

router.put("/updatestatus/:id", ProductController.updatestatus);

module.exports = router;
