const express = require("express");
const router = express.Router();

const PujaCategoryController = require("../../controllers/pujamanagment/PujaCategoryController");

router.post("/category/create", PujaCategoryController.create);

router.get("/category/find", PujaCategoryController.getCategory);
router.delete("/category/delete/:id", PujaCategoryController.deleteCategory);

router.put("/category/update/:id", PujaCategoryController.update);

module.exports = router;
