const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const blogController = require("../../controllers/homemanagment/blogController");

router.post(
    "/create",
    upload.fields([{ name: "image", maxCount: 1 }]),
    blogController.create,
);

router.get("/find", blogController.getBlogs);
router.delete("/delete/:id", blogController.deleteBlog);

router.put(
    "/update/:id",
    upload.fields([{ name: "image", maxCount: 1 }]),
    blogController.update,
);

module.exports = router;
