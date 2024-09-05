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

const getCart = async (req, res) => {
    const userId = req.user.id 

    try {
      const cart = await Cart.findOne({ userId: userId })
        .populate('products.productId')
        .lean()
        .exec();
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for user ID: ' + userId });
      }
  
      // Renaming 'productId' to 'product' in the result
      const modifiedCart = {
        ...cart, // Spread the rest of the cart object
        products: cart.products.map(item => {
          return {
            ...item, // Spread the rest of the product object
            product: {...item.productId, filters: item.filters}, // Rename 'productId' to 'product'
            productId: undefined, // Optionally remove the original 'productId' field
            filters: undefined,
            __v:undefined
          };
        })
      };

      res.status(200).json({success:true, data:modifiedCart});
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    addProductToCart,
    getCart
};
