const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const { cookies, headers } = req;
        const token = cookies?.token || headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                message: "Please Login",
                error: true,
                success: false
            });
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        req.userId = decoded?._id;
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message === "jwt malformed" ? "Invalid token" : err.message,
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
