const { where } = require("sequelize");
const db = require("../../models");
const { Pandit } = db;

/* ================= GET Marquee ================= */

exports.getPandits = async (req, res) => {
  try {
    const pandits = await Pandit.findAll({
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      pandits: pandits
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "pandits fetch failed",
      error: error.original?.message || error.message
    });
  }
};

exports.getPanditDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const pandit = await Pandit.findOne({
      where: { slug: slug },
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      pandit: pandit
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "pandit fetch failed",
      error: error.original?.message || error.message
    });
  }
};
