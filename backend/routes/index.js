const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");

const authRoutes = require("../routes/authentication/authRoutes");
const locationRoutes = require("../routes/location/locationRoutes");
const packageRoutes = require("../routes/tourmanagment/packageRoutes");
const cabRoutes = require("../routes/tourmanagment/cabRoutes");
const categoryRoutes = require("../routes/productmanagment/categoryRoutes");
const productRoutes = require("../routes/productmanagment/productRoutes");
const pujacategoryRoutes = require("../routes/pujamanagment/categoryRoutes");
const pujaRoutes = require("../routes/pujamanagment/pujaRoutes");
const pujapackageRoutes = require("../routes/pujamanagment/pujapackageRoutes");
const sliderRoutes = require("../routes/homemanagment/sliderRoutes");
const marqueeRoutes = require("../routes/homemanagment/marqueeRoutes");
const blogRoutes = require("../routes/homemanagment/blogRoutes");
// End Admin Routes

//Frontend Routes

const homeRoutes = require("../routes/frontend/homeRoutes");
const pujaRoute = require("../routes/frontend/pujaRoutes");
const productRoute = require("../routes/frontend/productRoutes");
const authRoute = require("../routes/frontend/authRoutes");
const orderRoutes = require("../routes/frontend/orderRoutes");
const UserMiddleware = require("../middleware/UserMiddleware");

//  Frontend Routes

router.use("/api/home", homeRoutes);
router.use("/api/puja", pujaRoute);
router.use("/api/shop", productRoute);
router.use("/api/authentication", authRoute);
router.use("/api/order", UserMiddleware, orderRoutes);

// Admin Routes

router.use("/api/auth", authRoutes);
router.use("/api/location", locationRoutes);
router.use("/api/package", AuthMiddleware, packageRoutes);
router.use("/api/category", AuthMiddleware, categoryRoutes);
router.use("/api/product", AuthMiddleware, productRoutes);
router.use("/api/puja", AuthMiddleware, pujacategoryRoutes);
router.use("/api/puja", AuthMiddleware, pujaRoutes);
router.use("/api/puja/package", AuthMiddleware, pujapackageRoutes);
router.use("/api/cab", AuthMiddleware, cabRoutes);
router.use("/api/slider", AuthMiddleware, sliderRoutes);
router.use("/api/marquee", AuthMiddleware, marqueeRoutes);
router.use("/api/blog", AuthMiddleware, blogRoutes);

module.exports = router;
