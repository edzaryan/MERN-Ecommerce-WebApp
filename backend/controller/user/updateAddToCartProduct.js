const addToCartModel = require("../../models/cartProductModel");


const updateAddToCartProduct = async (req, res) => {
    const { _id, quantity } = req?.body

    try {
        const updateProduct = await addToCartModel.updateOne(
            { _id },
            { quantity }
        )

        res.json({
            message: "Product Updated",
            data: updateProduct,
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = updateAddToCartProduct
