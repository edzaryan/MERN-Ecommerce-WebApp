const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error("Invalid password");
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly: true,
            secure: true
        };

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(401).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = userSignInController;
