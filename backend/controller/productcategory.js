const ProductCategory = require("../model/productCategory");
const Product = require("../model/product")
const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    }
  });
};

const insertCategory = async (req, res) => {
  const { category, alt, imgTitle, slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq } = req.body;

  const photo = req.file.filename

  try {
    const existingCategory = await ProductCategory.findOne({ category });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new ProductCategory({ category, alt, imgTitle, photo, slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const updateCategory = async (req, res) => {
  // Update main category
  const { slugs } = req.query;

  const { category, alt, imgTitle, slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq } = req.body;
  let photo = req.body.photo;

  if (req.file) {
    photo = req.file.filename;
  }
  try {
    const updatedCategory = await ProductCategory.findOneAndUpdate(
      { slug: slugs },
      { category, alt, imgTitle, photo, slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




// const updateSubCategory = async (req, res) => {
//   // Update category
//   const { categoryId, subCategoryId } = req.query;

//   const { category,alt,slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq } = req.body;
//   let photo = req.body.photo; 

//   if (req.file) {
//     photo = req.file.filename; 
//   }

//   try {
//     const categoryDoc = await ProductCategory.findById(categoryId);
//     if (!categoryDoc) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     const subCategory = categoryDoc.subCategories.id(subCategoryId);
//     if (!subCategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }



//     subCategory.category = category || subCategory.category;
//     subCategory.photo = photo || subCategory.photo;
//     subCategory.alt = alt || subCategory.alt;
//     subCategory.slug = slug || subCategory.slug;
//     subCategory.metatitle = metatitle || subCategory.metatitle;
//     subCategory.metadescription = metadescription || subCategory.metadescription;
//     subCategory.metakeywords = metakeywords || subCategory.metakeywords;
//     subCategory.metacanonical = metacanonical || subCategory.metacanonical;
//     subCategory.metalanguage = metalanguage || subCategory.metalanguage;
//     subCategory.metaschema = metaschema || subCategory.metaschema;
//     subCategory.otherMeta = otherMeta || subCategory.otherMeta;
//     subCategory.url = url || subCategory.url;
//     subCategory.priority = priority || subCategory.priority;
//     subCategory.changeFreq = changeFreq || subCategory.changeFreq;



//     await categoryDoc.save();

//     if (!categoryDoc) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.status(200).json(categoryDoc);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const updatesubsubcategory = async (req, res) => {
//   const { categoryId, subCategoryId, subSubCategoryId } = req.query;
//   const {category,alt,slug, metatitle, metadescription, metakeywords, metacanonical, metalanguage, metaschema, otherMeta, url, priority, changeFreq} = req.body;
//   let photo = req.body.photo; 

//   if (req.file) {
//     photo = req.file.filename; 
//   }
//   try {
//     const categoryDoc = await ProductCategory.findById(categoryId);
//     if (!categoryDoc) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     const subCategory = categoryDoc.subCategories.id(subCategoryId);
//     if (!subCategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     const subSubCategory = subCategory.subSubCategory.id(subSubCategoryId);
//     if (!subSubCategory) {
//       return res.status(404).json({ message: 'Sub-subcategory not found' });
//     }

//     subSubCategory.category = category || subSubCategory.category;
//     subSubCategory.photo = photo || subSubCategory.photo;
//     subSubCategory.alt = alt || subSubCategory.alt;
//     subSubCategory.slug = slug || subSubCategory.slug;
//     subSubCategory.metatitle = metatitle || subSubCategory.metatitle;
//     subSubCategory.metadescription = metadescription || subSubCategory.metadescription;
//     subSubCategory.metakeywords = metakeywords || subSubCategory.metakeywords;
//     subSubCategory.metacanonical = metacanonical || subSubCategory.metacanonical;
//     subSubCategory.metalanguage = metalanguage || subSubCategory.metalanguage;
//     subSubCategory.metaschema = metaschema || subSubCategory.metaschema;
//     subSubCategory.otherMeta = otherMeta || subSubCategory.otherMeta;
//     subSubCategory.url = url || subSubCategory.url;
//     subSubCategory.priority = priority || subSubCategory.priority;
//     subSubCategory.changeFreq = changeFreq || subSubCategory.changeFreq;

//     await categoryDoc.save();
//     res.status(200).json(categoryDoc);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// }

const deletecategory = async (req, res) => {
  const { id } = req.query;

  try {
    // Find the category by its ID
    const category = await ProductCategory.findOne({ slug: id });

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const photoPath = path.join(__dirname, '../logos', category.photo);
    deleteFile(photoPath);


    // Proceed to delete the category
    const deletedCategory = await ProductCategory.findOneAndDelete({ slug: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }


    // Find and update all products that reference this category, removing the category reference
    await Product.updateMany(
      { categories: id },
      { $pull: { categories: id } }
    );

    res.status(200).json({ message: 'Category deleted successfully and references removed from products' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// const deletesubcategory = async (req, res) => {
//   // Delete subcategory
//   const { categoryId, subCategoryId } = req.query;


//   try {
//     const categoryDoc = await ProductCategory.findById(categoryId);
//     if (!categoryDoc) {

//       return res.status(404).json({ message: 'Category not found' });
//     }

//     const subCategoryIndex = categoryDoc.subCategories.findIndex(subCat => subCat._id.toString() === subCategoryId);
//     if (subCategoryIndex === -1) {

//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     const subCategory = categoryDoc.subCategories[subCategoryIndex];

//     // Check if there are sub-subcategories
//     if (subCategory.subSubCategory && subCategory.subSubCategory.length > 0) {

//       return res.status(400).json({ message: 'Subcategory has associated sub-subcategories and cannot be deleted' });
//     }

//     const photoPath = path.join(__dirname, '../logos', subCategory.photo);
//     deleteFile(photoPath);

//     // Remove the subcategory from the array
//     categoryDoc.subCategories.splice(subCategoryIndex, 1);

//     await categoryDoc.save();


//     // Find and update all products that reference this subcategory, removing the subcategory reference
//     await Product.updateMany(
//       { subcategories: subCategoryId },
//       { $pull: { subcategories: subCategoryId } }
//     );

//     res.status(200).json({ message: 'Subcategory deleted successfully and references removed from products' });
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


// const deletesubsubcategory = async (req, res) => {
//   // Delete sub-subcategory
//   const { categoryId, subCategoryId, subSubCategoryId } = req.query;


//   try {
//     const categoryDoc = await ProductCategory.findById(categoryId);
//     if (!categoryDoc) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     const subCategory = categoryDoc.subCategories.id(subCategoryId);
//     if (!subCategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     const subSubCategoryIndex = subCategory.subSubCategory.findIndex(subSubCat => subSubCat._id.toString() === subSubCategoryId);
//     if (subSubCategoryIndex === -1) {

//       return res.status(404).json({ message: 'Sub-subcategory not found' });
//     }

//     const photoPath = path.join(__dirname, '../logos', subCategory.subSubCategory[subSubCategoryIndex].photo);
//     deleteFile(photoPath);



//     subCategory.subSubCategory.splice(subSubCategoryIndex, 1);

//     await categoryDoc.save();
//     await Product.updateMany(
//       { subSubcategories: subSubCategoryId },
//       { $pull: { subSubcategories: subSubCategoryId } }
//     );
//     res.status(200).json({ message: 'SubSubcategory deleted successfully and references removed from services' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// }

const getAll = async (req, res) => {
  try {
    const categories = await ProductCategory.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificCategory = async (req, res) => {
  try {
    // Extract categoryId from query params
    const { categoryId } = req.query;

    // Log to check if categoryId is correctly received
    console.log('Received categoryId:', categoryId);

    // Validate if categoryId exists in the query params
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Find category in the ProductCategory collection
    const category = await ProductCategory.findOne({ slug: categoryId });

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Send the category data back in the response
    res.status(200).json(category);

  } catch (error) {
    // Log error for debugging
    console.error('Error fetching category:', error);

    // Return server error response
    res.status(500).json({ message: 'Server error', error });
  }
};


// const getSpecificSubcategory = async (req, res) => {
//   const { categoryId, subCategoryId } = req.query;
//   try {
//     const category = await ProductCategory.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     const subCategory = category.subCategories.id(subCategoryId);
//     if (!subCategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }
//     res.status(200).json(subCategory);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// }

// const getSpecificSubSubcategory = async (req, res) => {
//   const { categoryId, subCategoryId, subSubCategoryId } = req.query;

//   try {
//     const category = await ProductCategory.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     const subCategory = category.subCategories.id(subCategoryId);
//     if (!subCategory) {
//       return res.status(404).json({ message: 'Subcategory not found' });
//     }

//     const subSubCategory = subCategory.subSubCategory.id(subSubCategoryId);
//     if (!subSubCategory) {
//       return res.status(404).json({ message: 'Sub-subcategory not found' });
//     }

//     res.status(200).json(subSubCategory);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const fetchCategoryUrlPriorityFreq = async (req, res) => {
  try {
    const categories = await ProductCategory.find({}, 'id url changeFreq priority lastmod')
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const fetchCategoryUrlmeta = async (req, res) => {
  try {
    const categories = await ProductCategory.find({}, 'id url metatitle metadescription metakeywords metacanonical metalanguage metaschema otherMeta')
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const editCategoryUrlPriorityFreq = async (req, res) => {
  try {
    const { id } = req.query;
    const { url, priority, changeFreq } = req.body;

    const updateFields = { url, priority, changeFreq };
    let updatedDocument = null;

    // Search and update the top-level ProductCategory document
    updatedDocument = await ProductCategory.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    // if (!updatedDocument) {
    //   // If not found, search and update in subCategories
    //   updatedDocument = await ProductCategory.findOneAndUpdate(
    //     { 'subCategories._id': id },
    //     { $set: { 'subCategories.$.url': url, 'subCategories.$.priority': priority, 'subCategories.$.changeFreq': changeFreq} },
    //     { new: true }
    //   );
    // }

    // if (!updatedDocument) {
    //   // If not found, search and update in subSubCategories
    //   updatedDocument = await ProductCategory.findOneAndUpdate(
    //     { 'subCategories.subSubCategory._id': id },
    //     { $set: { 'subCategories.$[subCat].subSubCategory.$[subSubCat].url': url, 'subCategories.$[subCat].subSubCategory.$[subSubCat].priority': priority, 'subCategories.$[subCat].subSubCategory.$[subSubCat].changeFreq': changeFreq } },
    //     { arrayFilters: [{ 'subCat.subSubCategory._id': id }, { 'subSubCat._id': id }], new: true }
    //   );
    // }

    // if (!updatedDocument) {
    //   return res.status(404).json({ error: "ID not found in any category" });
    // }

    res.status(200).json({ message: "Url, priority, change frequency, and lastmod updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const editCategoryUrlmeta = async (req, res) => {
  try {
    const { id } = req.query;
    const { url, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta } = req.body;
    console.log(id);

    const updateFields = { url, metatitle, metadescription, metakeywords, metalanguage, metacanonical, metaschema, otherMeta };
    let updatedDocument = null;

    // Search and update the top-level ProductCategory document
    updatedDocument = await ProductCategory.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    // if (!updatedDocument) {
    //   // If not found, search and update in subCategories
    //   updatedDocument = await ProductCategory.findOneAndUpdate(
    //     { 'subCategories._id': id },
    //     { $set: {
    //         'subCategories.$.url': url,
    //         'subCategories.$.metatitle': metatitle,
    //         'subCategories.$.metadescription': metadescription,
    //         'subCategories.$.metakeywords': metakeywords,
    //         'subCategories.$.metalanguage': metalanguage,
    //         'subCategories.$.metacanonical': metacanonical,
    //         'subCategories.$.metaschema': metaschema,
    //         'subCategories.$.otherMeta': otherMeta,
    //       } 
    //     },
    //     { new: true }
    //   );
    // }

    // if (!updatedDocument) {
    //   // If not found, search and update in subSubCategories
    //   updatedDocument = await ProductCategory.findOneAndUpdate(
    //     { 'subCategories.subSubCategory._id': id },
    //     { $set: {
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].url': url,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metatitle': metatitle,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metadescription': metadescription,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metakeywords': metakeywords,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metalanguage': metalanguage,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metacanonical': metacanonical,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].metaschema': metaschema,
    //         'subCategories.$[subCat].subSubCategory.$[subSubCat].otherMeta': otherMeta,
    //       }
    //     },
    //     { arrayFilters: [{ 'subCat.subSubCategory._id': id }, { 'subSubCat._id': id }], new: true }
    //   );
    // }

    if (!updatedDocument) {
      return res.status(404).json({ error: "ID not found in any category" });
    }

    res.status(200).json({ message: "Meta details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// const deleteCategoryUrlPriorityFreq = async (req, res) => {
//   try {
//     const { id } = req.query;
//     console.log(id);

//     const updateFields = { $unset: { url: "", priority: "", changeFreq: "" } };
//     let updatedDocument = null;

//     // Search and update the top-level ProductCategory document
//     updatedDocument = await ProductCategory.findByIdAndUpdate(
//       id,
//       updateFields,
//       { new: true }
//     );

//     if (!updatedDocument) {
//       // If not found, search and update in subCategories
//       updatedDocument = await ProductCategory.findOneAndUpdate(
//         { 'subCategories._id': id },
//         { $unset: { 'subCategories.$.url': '', 'subCategories.$.priority': '', 'subCategories.$.changeFreq': '' } },
//         { new: true }
//       );
//     }

//     if (!updatedDocument) {
//       // If not found, search and update in subSubCategories
//       updatedDocument = await ProductCategory.findOneAndUpdate(
//         { 'subCategories.subSubCategory._id': id },
//         { $unset: { 'subCategories.$[subCat].subSubCategory.$[subSubCat].url': '', 'subCategories.$[subCat].subSubCategory.$[subSubCat].priority': '', 'subCategories.$[subCat].subSubCategory.$[subSubCat].changeFreq': '' } },
//         { arrayFilters: [{ 'subCat.subSubCategory._id': id }, { 'subSubCat._id': id }], new: true }
//       );
//     }

// if (!updatedDocument) {
//   return res.status(404).json({ error: "ID not found in any category" });
// }

//     res.status(200).json({ message: "Url, priority, and freq deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


const fetchCategoryUrlPriorityFreqById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    let categoryData = null;

    // Attempt to find the category by ID at the top level
    const topCategory = await ProductCategory.findById(id).select('url priority changeFreq');

    if (topCategory) {
      categoryData = {
        url: topCategory.url,
        priority: topCategory.priority,
        changeFreq: topCategory.changeFreq
      };
    }
    //  else {
    //   // If not found at the top level, search in subcategories
    //   const parentCategory = await ProductCategory.findOne(
    //     { 'subCategories._id': id },
    //     { 'subCategories.$': 1 }
    //   );

    //   if (parentCategory && parentCategory.subCategories && parentCategory.subCategories.length > 0) {
    //     const subCategory = parentCategory.subCategories[0];
    //     categoryData = {
    //       url: subCategory.url,
    //       priority: subCategory.priority,
    //       changeFreq: subCategory.changeFreq
    //     };
    //   }
    // }

    // if (!categoryData) {
    //   // If not found in subcategories, search in sub-subcategories
    //   const parentCategory = await ProductCategory.findOne(
    //     { 'subCategories.subSubCategory._id': id },
    //     { 'subCategories.subSubCategory.$': 1 }
    //   );

    //   if (parentCategory && parentCategory.subCategories && parentCategory.subCategories.length > 0) {
    //     const subSubCategory = parentCategory.subCategories[0].subSubCategory[0];
    //     categoryData = {
    //       url: subSubCategory.url,
    //       priority: subSubCategory.priority,
    //       changeFreq: subSubCategory.changeFreq
    //     };
    //   }
    // }

    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(categoryData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchCategoryUrlmetaById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    let categoryData = null;

    // Find the product category by ID and select specific fields
    categoryData = await ProductCategory.findById(id).select('url metatitle metadescription metakeywords metalanguage metacanonical metaschema otherMeta');


    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCategoryAndPhoto = async (req, res) => {
  try {
    const categories = await ProductCategory.find().select('category photo alt imgTitle slug');

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = { getCategoryAndPhoto, insertCategory, updateCategory, deletecategory, getAll, getSpecificCategory, fetchCategoryUrlPriorityFreq, editCategoryUrlPriorityFreq, fetchCategoryUrlPriorityFreqById, fetchCategoryUrlmeta, editCategoryUrlmeta, fetchCategoryUrlmetaById };