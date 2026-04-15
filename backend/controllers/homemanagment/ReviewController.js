const db = require("../../models");
const { ClientReview } = db;

/* ================= CREATE MARQUEE ================= */
exports.create = async (req, res) => {
  try {
    const { type, title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title text is required"
      });
    }

    const review = await ClientReview.create({
      user_id: req.admin.id,
      type,
      title,
      description
    });

    return res.status(201).json({
      success: true,
      message: "Client Review created successfully",
      data: review
    });
  } catch (error) {
    console.error("Create Client Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/* ================= UPDATE MARQUEE ================= */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description } = req.body;

    const review = await ClientReview.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found"
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "review text is required"
      });
    }

    await review.update({
      type,
      title,
      description
    });

    return res.status(200).json({
      success: true,
      message: "review updated successfully",
      data: review
    });
  } catch (error) {
    console.error("Update review Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/* ================= GET ALL MARQUEES ================= */
exports.getReviews = async (req, res) => {
  try {
    const reviews = await ClientReview.findAll({
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Reviews fetch failed",
      error: error.original?.message || error.message
    });
  }
};

/* ================= DELETE MARQUEE ================= */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await ClientReview.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found"
      });
    }

    await review.destroy();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Review delete failed",
      error: error.original?.message || error.message
    });
  }
};
