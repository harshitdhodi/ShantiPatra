const StrappingPoint = require('../model/strappingPoints');
const Product=require("../model/product")
// Create a new product detail
exports.createStrappingPoint = async (req, res) => {
    try {
        const { paperCore, color, packing, length, qty, productId } = req.body;

        const newStrappingPoint = new StrappingPoint({
            paperCore,
            color,
            packing,
            length,
            qty,
            productId
        });

        await newStrappingPoint.save();
        res.status(201).json(newStrappingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all product details
exports.getStrappingPoint = async (req, res) => {
  try {
    // Fetch all product details
    const strappingPoint = await StrappingPoint.find();

    if (!strappingPoint.length) {
      return res.status(404).json({ message: 'Product Details not found' });
    }

    // Fetch product names and merge them with product details
    const productsWithProductName = await Promise.all(strappingPoint.map(async (product) => {
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
exports.getStrappingPointById = async (req, res) => {
    try {
        const {id} = req.query;
        const strappingPoint = await StrappingPoint.find({_id:id})
        if (!strappingPoint) {
            return res.status(404).json({ error: 'StrappingPoint not found' });
        }

        res.status(200).json(strappingPoint);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Update a product detail by ID
exports.updateStrappingPoint = async (req, res) => {
    try {
        const { paperCore, color, packing, length, qty, productId } = req.body;
        const { id } = req.query
        const strappingPoint = await StrappingPoint.findByIdAndUpdate(id, {
            paperCore,
            color,
            packing,
            length,
            qty,
            productId
        }, { new: true });

        if (!strappingPoint) {
            return res.status(404).json({ error: 'StrappingPoint not found' });
        }

        res.status(200).json(strappingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product detail by ID
exports.deleteStrappingPoint = async (req, res) => {
    try {
        const { id } = req.query
        const strappingPoint = await StrappingPoint.findByIdAndDelete(id);

        if (!strappingPoint) {
            return res.status(404).json({ error: 'StrappingPoint not found' });
        }

        res.status(200).json({ message: 'StrappingPoint deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product detail by ID
exports.getStrappingPointBySlug = async (req, res) => {
    try {
        const {slug} = req.query;
        const strappingPoint = await StrappingPoint.find({productId:slug})
        if (!strappingPoint) {
            return res.status(404).json({ error: 'StrappingPoint not found' });
        }

        res.status(200).json(strappingPoint);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
