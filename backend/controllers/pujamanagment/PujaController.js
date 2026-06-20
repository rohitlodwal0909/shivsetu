const db = require("../../models");
const { Puja, PujaCategory } = db;

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // unicode normalize
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // Hindi + English + Numbers allow
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

exports.getPujaBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const puja = await Puja.findOne({
      where: { slug: slug }
    });

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: puja
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

exports.create = async (req, res) => {
  try {
    const {
      puja_name,
      category_id,
      puja_duration,
      price,
      location,
      date,
      description
    } = req.body;

    let bannerImage = null;
    if (req.files?.image) {
      bannerImage = req.files.image[0].filename;
    }

    // Gallery Images
    let galleryImages = [];
    if (req.files?.gallery) {
      galleryImages = req.files.gallery.map((file) => file.filename);
    }

    const slug = generateSlug(puja_name);

    const category = await Puja.create({
      user_id: req.admin.id,
      category_id,
      puja_name,
      puja_duration,
      price,
      location,
      date,
      slug,
      description,
      image: bannerImage,
      gallery: galleryImages
    });

    return res.status(201).json({
      success: true,
      message: "Puja created successfully",
      data: category
    });
  } catch (error) {
    console.error("Create Puja Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      puja_name,
      category_id,
      puja_duration,
      price,
      location,
      date,
      description
    } = req.body;
    const { id } = req.params;

    const puja = await Puja.findByPk(id);

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found"
      });
    }

    let bannerImage = puja.image;
    if (req.files?.image?.length) {
      bannerImage = req.files.image[0].filename;
    }

    // 🖼 Gallery Images (keep old if not uploaded)
    let galleryImages = puja.gallery || [];
    if (req.files?.gallery?.length) {
      galleryImages = req.files.gallery.map((file) => file.filename);
    }

    const slug = puja_name ? generateSlug(puja_name) : puja.slug;

    await puja.update({
      category_id,
      puja_name,
      puja_duration,
      price,
      location,
      date,
      slug,
      description,
      image: bannerImage,
      gallery: galleryImages
    });

    return res.status(200).json({
      success: true,
      message: "Puja updated successfully"
    });
  } catch (error) {
    console.error("Update Puja Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

exports.getPuja = async (req, res) => {
  try {
    const pujas = await Puja.findAll({
      include: [{ model: PujaCategory, as: "puja_category" }],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: pujas
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

exports.deletePuja = async (req, res) => {
  try {
    const { id } = req.params;

    const puja = await Puja.findByPk(id);

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found"
      });
    }

    await puja.destroy();
    return res.status(200).json({
      success: true,
      message: "Puja deleted successfully"
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Puja delete failed",
      error: error.original?.message || error.message
    });
  }
};
