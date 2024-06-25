const productModel = require("../../models/productModel")
const addToCartModel = require("../../models/cartProductModel")


const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body
        const currentUserId = req.userId

        const isProductExists = await productModel.findById(productId)
        if (!isProductExists) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            })
        }

        const isProductInCart = await addToCartModel.findOne({productId, userId: currentUserId})
        if (isProductInCart) {
            return res.status(400).json({
                message: "Already exists in the cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId,
            quantity: 1,
            userId: currentUserId
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data: saveProduct,
            message: "Product Added",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = addToCartController
