const Products = require("../Models/product.js");

const addProduct = async (req, res) => {
    try {
        const { title, description, price, crossPrice, images, categories, stock, filters } = req.body;
        if (!title || !description || !price || !crossPrice || !images || !categories || !stock ) {
            return res.status(400).json({ message: "Requred fields are missing", success: false });
        }
        const product = new Products({
            title,
            description,
            price,
            crossPrice,
            images,
            categories,
            stock,
            filters
        });
        await product.save();
        res.status(200).json({ success: true, message: "Product added successfully", data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
}

const getAllProducts = async (req, res) => {
    try {
        // Destructure query parameters with default values
        let { page = 1, limit = 10, category, searchText, sortBy = 'title', sortOrder = 'asc', minPrice, maxPrice } = req.query;

        // Convert page and limit to integers
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        // Validate page and limit
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            return res.status(400).json({ message: "Invalid page or limit value", success: false });
        }

        // Build the query object
        const query = {};

        // Add search text filter if provided
        if (searchText) {
            query.title = { $regex: searchText, $options: "i" };
        }

        // Add category filter if provided
        if (category) {
            query.categories = { $in: Array.isArray(category) ? category : [category] };
        }

        // Add price range filter if minPrice or maxPrice is provided
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = parseFloat(maxPrice);
            }
        }

        // Prepare sorting options
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        // Fetch products from the database
        const products = await Products.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit);

        // Respond with the products
        res.status(200).json({ success: true, data: products, page });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};



module.exports = {
    addProduct,
    getAllProducts
}
