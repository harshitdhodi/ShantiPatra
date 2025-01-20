const BOPPTable = require('../model/boppTable');
const Product=require("../model/product")
// Create a new product detail
exports.createBOPPTable = async (req, res) => {
    try {
        const { width, cartonNo, productId } = req.body;

        const newBOPPTable = new BOPPTable({
            width,
            cartonNo,
            productId
        });

        await newBOPPTable.save();
        res.status(201).json(newBOPPTable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all product details
exports.getBOPPTable = async (req, res) => {
  try {
    // Fetch all product details
    const boppTable = await BOPPTable.find();

    if (!boppTable.length) {
      return res.status(404).json({ message: 'Product Details not found' });
    }

    // Fetch product names and merge them with product details
    const productsWithProductName = await Promise.all(boppTable.map(async (product) => {
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
exports.getBOPPTableById = async (req, res) => {
    try {
        const {id} = req.query;
        const boppTable = await BOPPTable.find({_id:id})
        if (!boppTable) {
            return res.status(404).json({ error: 'BOPPTable not found' });
        }

        res.status(200).json(boppTable);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Update a product detail by ID
exports.updateBOPPTable = async (req, res) => {
    try {
        const { width, cartonNo, productId } = req.body;
        const { id } = req.query
        const boppTable = await BOPPTable.findByIdAndUpdate(id, {
            width,
            cartonNo,
            
           
    
            productId
        }, { new: true });

        if (!BOPPTable) {
            return res.status(404).json({ error: 'BOPPTable not found' });
        }

        res.status(200).json(BOPPTable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product detail by ID
exports.deleteBOPPTable = async (req, res) => {
    try {
        const { id } = req.query
        const boppTable = await BOPPTable.findByIdAndDelete(id);

        if (!boppTable) {
            return res.status(404).json({ error: 'BOPPTable not found' });
        }

        res.status(200).json({ message: 'BOPPTable deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product detail by ID
exports.getBOPPTableBySlug = async (req, res) => {
    try {
        const {slug} = req.query;
        const boppTable = await BOPPTable.find({productId:slug})
        if (!boppTable) {
            return res.status(404).json({ error: 'BOPPTable not found' });
        }

        res.status(200).json(boppTable);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
