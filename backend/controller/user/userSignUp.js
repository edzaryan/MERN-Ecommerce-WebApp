const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");


async function userSignUpController(req, res) {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        if (!name) {
            throw new Error("Please provide name");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
        
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
};


module.exports = userSignUpController;
