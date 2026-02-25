const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "uploads/common";

        // route ke basis par folder decide hoga
        if (req.baseUrl.includes("category")) {
            folder = "uploads/categories";
        } else if (req.baseUrl.includes("package")) {
            folder = "uploads/packages";
        } else if (req.baseUrl.includes("product")) {
            folder = "uploads/products";
        } else if (req.baseUrl.includes("puja")) {
            folder = "uploads/pujas";
        } else if (req.baseUrl.includes("cab")) {
            folder = "uploads/cabs";
        } else if (req.baseUrl.includes("slider")) {
            folder = "uploads/sliders";
        } else if (req.baseUrl.includes("blog")) {
            folder = "uploads/blogs";
        }

        // folder exist na kare to create
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );
    if (ext) cb(null, true);
    else cb(new Error("Only images allowed"));
};

module.exports = multer({ storage, fileFilter });
