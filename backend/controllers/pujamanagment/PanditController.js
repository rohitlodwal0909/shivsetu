const db = require("../../models");
const { Pandit } = db;

/* ================================
   SLUG GENERATOR
================================ */
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ================================
   CREATE PANDIT
================================ */
exports.create = async (req, res) => {
  try {
    const { name, puja_name, price, exprience, language, description } =
      req.body;

    const slug = generateSlug(name);

    let image = null;

    if (req.files?.image) {
      image = req.files.image[0].filename;
    }

    const pandit = await Pandit.create({
      user_id: req.admin.id,
      name,
      puja_name,
      slug,
      price,
      exprience,
      language,
      description,
      image
    });

    return res.status(201).json({
      success: true,
      message: "Pandit created successfully",
      data: pandit
    });
  } catch (error) {
    console.error("Create Pandit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Pandit creation failed",
      error: error.message
    });
  }
};

/* ================================
   UPDATE PANDIT
================================ */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, puja_name, price, exprience, language, description } =
      req.body;

    const pandit = await Pandit.findByPk(id);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found"
      });
    }

    let image = pandit.image;

    if (req.files?.image) {
      image = req.files.image[0].filename;
    }

    const slug = name ? generateSlug(name) : pandit.slug;

    await pandit.update({
      name,
      puja_name,
      slug,
      price,
      exprience,
      language,
      description,
      image
    });

    return res.status(200).json({
      success: true,
      message: "Pandit updated successfully",
      data: pandit
    });
  } catch (error) {
    console.error("Update Pandit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Pandit update failed",
      error: error.message
    });
  }
};

/* ================================
   GET ALL PANDITS
================================ */
exports.getPandits = async (req, res) => {
  try {
    const pandits = await Pandit.findAll({
      order: [["created_at", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: pandits
    });
  } catch (error) {
    console.error("Fetch Pandits Error:", error);

    return res.status(500).json({
      success: false,
      message: "Pandit fetch failed",
      error: error.message
    });
  }
};

/* ================================
   DELETE PANDIT (SOFT DELETE)
================================ */
exports.deletePandit = async (req, res) => {
  try {
    const { id } = req.params;

    const pandit = await Pandit.findByPk(id);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found"
      });
    }

    await pandit.destroy(); // paranoid true => soft delete

    return res.status(200).json({
      success: true,
      message: "Pandit deleted successfully"
    });
  } catch (error) {
    console.error("Delete Pandit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Pandit delete failed",
      error: error.message
    });
  }
};
