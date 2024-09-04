const Cart = require("../Models/cart.js")

const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity, filters } = req.body;
        const userId = req.user.id;
        // Find the cart by userId
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if product already exists in cart
            const productIndex = cart.products.findIndex(product => product.productId === productId);

            if (productIndex > -1) {
                // If product exists in cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If product does not exist in cart, add it to the cart
                cart.products.push({ productId, quantity, filters });
            }
        } else {
            // If cart does not exist, create a new cart
            cart = new Cart({
                userId,
                products: [{ productId, quantity, filters }]
            });
        }

        // Save the cart
        const updatedCart = await cart.save();
        res.status(200).json({ success: true, data: updatedCart});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addProductToCart
};
