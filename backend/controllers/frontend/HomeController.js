const { where } = require("sequelize");
const db = require("../../models");
const {
  Marquee,
  Slider,
  Category,
  Product,
  Cab,
  Blog,
  Puja,
  PujaCategory,
  Package,
  City,
  State,
  ClientReview
} = db;

/* ================= GET Marquee ================= */

exports.getMarquee = async (req, res) => {
  try {
    const marquee = await Marquee.findAll({
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: marquee
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Marquee fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.getAllHomedata = async (req, res) => {
  try {
    const sliders = await Slider.findAll({
      attributes: ["id", "image"],
      order: [["created_at", "DESC"]]
    });

    const categories = await Category.findAll({
      attributes: ["id", "name", "icon", "slug", "description"],
      order: [["created_at", "DESC"]]
    });

    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category"
        }
      ],
      order: [["created_at", "DESC"]]
    });

    const cabs = await Cab.findAll({
      order: [["created_at", "DESC"]]
    });

    const blogs = await Blog.findAll({
      order: [["created_at", "DESC"]]
    });

    const reviews = await ClientReview.findAll({
      order: [["created_at", "DESC"]]
    });

    const pujas = await Puja.findAll({
      include: [{ model: PujaCategory, as: "puja_category" }],
      order: [["created_at", "DESC"]]
    });

    const tourpackage = await Package.findAll({
      include: [{ model: City, as: "cities" }],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      sliders: sliders,
      categories: categories,
      products: products,
      cabs: cabs,
      blogs: blogs,
      reviews: reviews,
      pujas: pujas,
      tour: tourpackage
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Marquee fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Package.findAll({
      include: [
        { model: State, as: "states" },
        { model: City, as: "cities" }
      ],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      tours
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "tours fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.getCabs = async (req, res) => {
  try {
    const cabs = await Cab.findAll({
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      cabs
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "cabs fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.singleTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tours = await Package.findOne({
      where: { id: id },
      include: [
        { model: State, as: "states" },
        { model: City, as: "cities" }
      ],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      tours
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "tours fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.singlecab = async (req, res) => {
  try {
    const id = req.params.id;
    const cabs = await Cab.findOne({
      where: { id: id },
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      cabs
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "cabs fetch failed",
      error: error.original?.message || error.message
    });
  }
};
