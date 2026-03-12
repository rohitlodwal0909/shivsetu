const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = db;

/* ================= USER SIGNUP ================= */

exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // 🔹 Basic Validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔹 Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ email }, { mobile }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Mobile already registered"
      });
    }

    // 🔹 Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      status: "active"
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile and password are required"
      });
    }

    // Find user by mobile
    const user = await User.findOne({
      where: { mobile }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};
