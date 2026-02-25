const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const { Admin } = db;

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            const error = new Error("Invalid Email");
            error.status = 404;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            const error = new Error("Invalid Password");
            error.status = 401;
            return next(error);
        }

        //  Generate JWT Token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login sucessfully",
            token,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error.original || error);
        return res.status(500).json({
            message: "Login failed",
            error: error.original?.message || error.message,
        });
    }
};
