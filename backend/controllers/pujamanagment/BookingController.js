const db = require("../../models");
const { PujaBooking, Puja, PujaPackage } = db;

exports.getBookings = async (req, res) => {
  try {
    const bookings = await PujaBooking.findAll({
      include: [
        {
          model: PujaPackage,
          attributes: ["puja_id", "name"],
          include: [{ model: Puja, as: "puja", attributes: ["puja_name"] }]
        }
      ],
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error("Fetch bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "bookings fetch failed",
      error: error.message
    });
  }
};
