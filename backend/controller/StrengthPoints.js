const StrengthPoint = require('../model/strengthPoint');
const Product=require("../model/product")
// Create a new product detail
exports.createstrengthPoint = async (req, res) => {
    try {
        const { points, productId } = req.body;

        const newstrengthPoint = new StrengthPoint({
            points,
            productId
        });

        await newstrengthPoint.save();
        res.status(201).json(newstrengthPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all product details
exports.getstrengthPoint = async (req, res) => {
  try {
    // Fetch all product details
    const strengthPoint = await StrengthPoint.find();

    if (!strengthPoint.length) {
      return res.status(404).json({ message: 'Product Details not found' });
    }

    // Fetch product names and merge them with product details
    const productsWithProductName = await Promise.all(strengthPoint.map(async (product) => {
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
exports.getstrengthPointById = async (req, res) => {
    try {
        const {id} = req.query;
        const strengthPoint = await StrengthPoint.find({_id:id})
        if (!strengthPoint) {
            return res.status(404).json({ error: 'strengthPoint not found' });
        }

        res.status(200).json(strengthPoint);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Update a product detail by ID
exports.updatestrengthPoint = async (req, res) => {
    try {
        const { points, productId } = req.body;
        const { id } = req.query
        const strengthPoint = await StrengthPoint.findByIdAndUpdate(id, {
            points,
           
            
           
    
            productId
        }, { new: true });

        if (!strengthPoint) {
            return res.status(404).json({ error: 'strengthPoint not found' });
        }

        res.status(200).json(strengthPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product detail by ID
exports.deletestrengthPoint = async (req, res) => {
    try {
        const { id } = req.query
        const strengthPoint = await StrengthPoint.findByIdAndDelete(id);

        if (!strengthPoint) {
            return res.status(404).json({ error: 'strengthPoint not found' });
        }

        res.status(200).json({ message: 'strengthPoint deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product detail by ID
exports.getstrengthPointBySlug = async (req, res) => {
    try {
        const {slug} = req.query;
        const strengthPoint = await StrengthPoint.find({productId:slug})
        if (!strengthPoint) {
            return res.status(404).json({ error: 'strengthPoint not found' });
        }

        res.status(200).json(strengthPoint);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
