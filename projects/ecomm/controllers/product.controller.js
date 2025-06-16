const ProductModel = require("../models/product.model");

const listProducts = async (req, res) => {
    const searchKey = req.query.searchKey || "";
    const pageSize = req.query.pageSize || 5;
    const pageNo = req.query.pageNo || 1;

    const itemsToSkip = (pageNo - 1) * pageSize;

    // console.log("SEARCHKEY", searchKey);
    const findQuery = {
        $or: [
            {
                title: {
                    $regex: searchKey,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: searchKey,
                    $options: "i"
                }
            }
        ]
    };
    const totalItems = await ProductModel.find(findQuery).countDocuments();
    const products = await ProductModel
        .find(findQuery)
        .skip(itemsToSkip) // No of items to skip
        .limit(pageSize); // No of items to show

    res.json({
        success: true,
        message: "Products List API",
        totalItems: totalItems,
        results: products
    })
};

const createProduct = async (req, res) => {
    // Todo:  Validate all fields
    const product = await ProductModel.create(req.body);
    console.log(product);
    res.json({
        success: true,
        message: "Product created successfully",
        productId: product._id
    });
};

const productController = {
    listProducts,
    createProduct
};

module.exports = productController;