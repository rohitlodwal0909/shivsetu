const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const CategoryController = require("../../controllers/productmanagment/CategoryController");

router.post(
    "/create",
    upload.fields([{ name: "icon", maxCount: 1 }]),
    CategoryController.create,
);

router.get("/find", CategoryController.getCategory);
router.delete("/delete/:id", CategoryController.deleteCategory);

router.put(
    "/update/:id",
    upload.fields([{ name: "icon", maxCount: 1 }]),
    CategoryController.update,
);

module.exports = router;
