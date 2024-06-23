const productModel = require("../../models/productModel");


const getProductController = async (req, res) => {
    try {
        const all_products = await productModel.find().sort({ createdAt: -1 });

        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: all_products
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


module.exports = getProductController;