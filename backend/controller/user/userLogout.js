

async function userLogout(req, res) {
    try {
        res.clearCookie("token");

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch(err) {
        res.json({
            messgae: err.messgae || err,
            error: true,
            success: false
        });
    }
};


module.exports = userLogout;