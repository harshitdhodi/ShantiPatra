const ProductDetail = require('../model/productDetail');
const Product=require("../model/product")
// Create a new product detail
exports.createProductDetail = async (req, res) => {
    try {
        const { productCode, variants, size, moq, pcs, productId } = req.body;

        const newProductDetail = new ProductDetail({
            productCode,
            variants,
            size,
            moq,
            pcs,
            productId
        });

        await newProductDetail.save();
        res.status(201).json(newProductDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all product details
exports.getProductDetail = async (req, res) => {
  try {
    // Fetch all product details
    const productDetail = await ProductDetail.find();

    if (!productDetail.length) {
      return res.status(404).json({ message: 'Product Details not found' });
    }

    // Fetch product names and merge them with product details
    const productsWithProductName = await Promise.all(productDetail.map(async (product) => {
      const productNameRecord = await Product.findOne({ 'slug': product.productId });
      const productName = productNameRecord ? productNameRecord.title : 'Unnamed';
      return {
        ...product.toJSON(),
        productName
      };
    }));

    res.status(200).json({
      data: productsWithProductName
    });
  } catch (error) {
    console.error("Error retrieving product details:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid ID format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};


// Get a single product detail by ID
exports.getProductDetailById = async (req, res) => {
    try {
        const {id} = req.query;
        const productDetail = await ProductDetail.find({_id:id})
        console.log(productDetail)
        if (!productDetail) {
            return res.status(404).json({ error: 'ProductDetail not found' });
        }

        res.status(200).json(productDetail);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Update a product detail by ID
exports.updateProductDetail = async (req, res) => {
    try {
        const { productCode, variants, size, moq, pcs, productId } = req.body;
        const { id } = req.query
        const productDetail = await ProductDetail.findByIdAndUpdate(id, {
            productCode,
            variants,
            size,
            moq,
            pcs,
            productId
        }, { new: true });

        if (!productDetail) {
            return res.status(404).json({ error: 'ProductDetail not found' });
        }

        res.status(200).json(productDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product detail by ID
exports.deleteProductDetail = async (req, res) => {
    try {
        const { id } = req.query
        const productDetail = await ProductDetail.findByIdAndDelete(id);

        if (!productDetail) {
            return res.status(404).json({ error: 'ProductDetail not found' });
        }

        res.status(200).json({ message: 'ProductDetail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
