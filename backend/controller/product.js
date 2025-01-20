const Product = require("../model/product")
const productCategory = require("../model/productCategory")
const ProductDetail = require("../model/productDetail")
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')
const ImportedFile = require("../model/importedFiles")
const News = require("../model/news")

const insertProduct = async (req, res) => {
  try {
    const { title,homeDetail, details, alt, imgTitle, slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, benefits, categories, url, priority, changeFreq, status } = req.body;
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const catalogue = req.files['catalogue'] ? req.files['catalogue'][0].filename : '';

    const product = new Product({
      title,
      homeDetail,
      details,
      alt,
      imgTitle,
      slug,
      benefits,
      catalogue,
      metatitle,
      metadescription,
      metakeywords,
      metacanonical,
      metalanguage,
      metaschema,
      otherMeta,
      photo,
      url,
      changeFreq,
      priority,
      status,
      categories
    });
    await product.save();
    res.status(201).json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting product' });
  }
}


const updateProduct = async (req, res) => {
  const { slugs } = req.query;
  const updateFields = req.body;

  try {
    // Check if the product exists
    const existingProduct = await Product.findOne({ slug: slugs });

    // Process new uploaded photos
    let newPhotoPaths = [];
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      newPhotoPaths = req.files['photo'].map(file => file.filename); // Get the stored filenames
    }

    // If the product does not exist, create a new one
    if (!existingProduct) {
      const newProductData = {
        ...updateFields,
        photo: newPhotoPaths, // Add new photos
        catalogue: req.files && req.files['catalogue'] && req.files['catalogue'].length > 0 
            ? req.files['catalogue'][0].filename 
            : null // Handle catalogue upload
      };

      const newProduct = new Product(newProductData);
      await newProduct.save();
      return res.status(201).json(newProduct); // Return the newly created product
    }

    // If the product exists, update the existing one
    let updatedPhotos = existingProduct.photo;

    // Only update the photo field if new photos are provided
    if (newPhotoPaths.length > 0) {
      updatedPhotos = newPhotoPaths; // Replace existing photos with new ones
    }

    // Process new uploaded catalogue
    const catalogue = req.files && req.files['catalogue'] && req.files['catalogue'].length > 0 
        ? req.files['catalogue'][0].filename 
        : existingProduct.catalogue; // Keep existing catalogue if no new catalogue is uploaded

    // Prepare update fields
    const updatedFields = {
      ...updateFields,
      photo: updatedPhotos,
      catalogue
    };

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slugs },
      updatedFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const deleteProduct = async (req, res) => {
  const { slugs } = req.query;

  try {
    const product = await Product.findOne({ slug: slugs });

    product.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    const deletedProduct = await Product.findOneAndDelete({ slug: slugs });


    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

const deletePhotoAndAltText = async (req, res) => {

  const { slugs, imageFilename, index } = req.params;
  try {
    // Find the service by ID
    const product = await Product.findOne({ slug: slugs });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the photo and its alt text
    product.photo = product.photo.filter(photo => photo !== imageFilename);
    product.alt.splice(index, 1);
    product.imgTitle.splice(index, 1)

    await product.save();

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const count = await Product.countDocuments();
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);


    const productsWithCategoryName = await Promise.all(products.map(async (product) => {
      const category = await productCategory.findOne({ 'slug': product.categories });
      const categoryName = category ? category.category : 'Uncategorized';
      return {
        ...product.toJSON(),
        categoryName
      };
    }));
    res.status(200).json({
      data: productsWithCategoryName,
      total: count,
      currentPage: page,
      hasNextPage: count > page * limit
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};

const getSingleProduct = async (req, res) => {
  const { slugs } = req.query;

  try {
    const product = await Product.findOne({ slug: slugs });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getCategoryProducts = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = await Product.find({ categories: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const countProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting services' });
  }
};

const exportProductsToExcel = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Add headers
    worksheet.addRow(['ID', 'Title', 'Details', 'Photo', 'Alt', 'imgTitle', 'Status', 'Categories']);

    // Add data rows
    products.forEach(product => {
      worksheet.addRow([
        product._id.toString(),
        product.title,
        product.details,
        product.photo.join(', '),
        product.alt.join(', '),
        product.imgTitle.join(', '),
        product.status,
        product.categories.join(', '), // Convert array to comma-separated string
      ]);
    });

    // Generate a unique filename
    const filename = `products_${Date.now()}.xlsx`;

    // Set headers to trigger file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Write the Excel file to the response stream
    await workbook.xlsx.write(res);

    res.status(200).end();
  } catch (error) {
    console.error('Error exporting products:', error);
    res.status(500).json({ message: 'Failed to export products' });
  }
};

const importProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File not provided' });
    }

    const fileName = req.fileName;


    const importedFile = new ImportedFile({ fileName });
    await importedFile.save();
    const filePath = path.join(__dirname, '../files', fileName);
    const fileContents = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileContents, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const products = jsonData.map(item => ({
      title: item.Title,
      photo: item.Photo ? item.Photo.split(',').map(photo => photo.trim()) : [],
      alt: item.Alt ? item.Alt.split(',').map(alt => alt.trim()) : [],
      imgTitle: item.imgTitle ? item.imgTitle.split(',').map(imgTitle => imgTitle.trim()) : [],
      details: item.Details,
      status: item.Status,
      categories: item.Categories,
      subcategories: item.Subcategories,
      subSubcategories: item.SubSubcategories
    }));

    await Product.insertMany(products);

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: 'Failed to import data' });
  }
};

const fetchUrlPriorityFreq = async (req, res) => {
  try {
    // Get productId from request parameters
    const product = await Product.find({}).select('_id url priority changeFreq lastmod');
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchUrlmeta = async (req, res) => {
  try {
    // Get productId from request parameters
    const product = await Product.find({}).select('_id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta');
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

const editUrlPriorityFreq = async (req, res) => {
  try {
    const { id } = req.query; // Get productId from request parameters
    const { url, priority, changeFreq } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { url, priority, changeFreq, lastmod: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const editUrlmeta = async (req, res) => {
  try {
    const { id } = req.query; // Get productId from request parameters
    const { url, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { url, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// const deleteUrlPriorityFreq = async (req, res) => {
//   try {
//     const { id } = req.query; // Get productId from request parameters

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { $unset: { url: "", priority: "", changeFreq: "" } },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json({ message: "Url, priority, and freq deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const fetchUrlPriorityFreqById = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Find the product by ID and select specific fields
    const product = await Product.findById(id).select('url priority changeFreq');

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchUrlmetaById = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Find the product by ID and select specific fields
    const product = await Product.findById(id).select('url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta');

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const downloadCatalogue = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../catalogues', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'File download failed' });
    }
  });
};

const viewCatalogue = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'catalogues', filename);
  res.sendFile(filePath);
};

const getProductsByCategory = async (req, res) => {
  try {
    const { slugs } = req.query;

    // Fetch products based on category and status
    const products = await Product.find({
      categories: slugs,
      status: 'active'
    });

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAllProductTitles = async (req, res) => {
  try {
    // Fetch all products and only select the title field
    const products = await Product.find().select('title _id slug');

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error retrieving product titles:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getDataBySlug = async (req, res) => {
  try {
    // Extract slug from query parameters
    const { slugs } = req.query;

    console.log('Requested slug:', slugs); // Debug log

    if (!slugs) {
      return res.status(400).json({ error: "Slug is required" });
    }

    // Find product data by slug
    const productData = await Product.findOne({ slug: slugs });
    console.log('Product data found:', productData); // Debug log

    if (!productData) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find product detail data by slug
    const productDetailData = await ProductDetail.find({ productId: productData.slug });
    console.log('Product detail data found:', productDetailData); // Debug log

    if (!productDetailData) {
      return res.status(404).json({ error: "Product details not found" });
    }

    res.status(200).json({
      productData, 
      productDetailData
    });
  } catch (error) {
    console.error('Error fetching data by slug:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getLatestProducts = async (req, res) => {
  try {
    const limit = 6; // Limit to get the latest 2 products
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(limit); // Limit the result to 2

    const productsWithCategoryName = await Promise.all(products.map(async (product) => {
      const category = await productCategory.findOne({ 'slug': product.categories });
      const categoryName = category ? category.category : 'Uncategorized';

      // Ensure homeDetail has a value, defaulting to an empty string if undefined
      const homeDetail = product.homeDetail || '';

      return {
        ...product.toJSON(),
        categoryName,
        homeDetail, // Add homeDetail explicitly here
      };
    }));

    res.status(200).json({
      data: productsWithCategoryName,
      total: productsWithCategoryName.length, // Updated total to reflect number of fetched products
      currentPage: 1, // Set currentPage to 1 since we are not paginating
      hasNextPage: false // Set hasNextPage to false as we are only fetching the latest products
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    let errorMessage = 'Server error';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage, error });
  }
};

const getSlugs = async (req, res) => {
  try {
    const productSlugs = await Product.find({}, 'slug');  // Fetch only the `slug` field
    const productCategorySlugs = await productCategory.find({}, 'slug');  // Fetch only the `slug` field
    const newsSlugs = await News.find({}, 'slug');  // Fetch only the `slug` field

    res.json({
      productSlugs,
      productCategorySlugs,
      newsSlugs
    });
  } catch (error) {
      console.log(error)
    res.status(500).json({ error: 'Failed to fetch slugs' });
  }
};



module.exports = { getDataBySlug,getSlugs, getLatestProducts , getAllProductTitles, getProductsByCategory, downloadCatalogue, viewCatalogue, insertProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct, getCategoryProducts, countProducts, deletePhotoAndAltText, exportProductsToExcel, importProducts, fetchUrlPriorityFreq, editUrlPriorityFreq, fetchUrlPriorityFreqById, fetchUrlmeta, editUrlmeta, fetchUrlmetaById } 
