const { where } = require("sequelize");
const db = require("../../models");
const { Puja, PujaCategory, PujaPackage, PujaBooking } = db;

/* ================= GET Marquee ================= */

exports.getPuja = async (req, res) => {
  try {
    const category = await PujaCategory.findAll({
      order: [["created_at", "DESC"]]
    });

    const pujas = await Puja.findAll({
      include: [{ model: PujaCategory, as: "puja_category" }],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      category: category,
      pujas: pujas
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Puja fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.getPujaDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const pujas = await Puja.findOne({
      where: { slug: slug },
      include: [
        { model: PujaCategory, as: "puja_category" },
        {
          model: PujaPackage,
          as: "packages"
        }
      ],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      pujas: pujas
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Puja fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.bookPuja = async (req, res) => {
  try {
    const {
      puja_package_id,
      name,
      mobile_no,
      gotra,
      rashi,
      location,
      amount,
      payment_id
    } = req.body;

    if (!puja_package_id || !name || !mobile_no) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const booking = await PujaBooking.create({
      user_id: 1,
      puja_package_id,
      name,
      mobile_no,
      gotra,
      rashi,
      location,
      amount,
      payment_status: "success",
      payment_id
    });

    return res.status(201).json({
      success: true,
      message: "Puja booked successfully",
      booking
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message
    });
  }
};
