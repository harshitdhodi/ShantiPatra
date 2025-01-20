const Catalog = require('../model/catolog');

// Create a new catalog entry
exports.createCatalog = async (req, res) => {
  try {
    const catalog = new Catalog({ catalog: req.file.path });
    await catalog.save();
    res.status(201).json({ message: 'Catalog uploaded successfully', data: catalog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all catalog entries
exports.getCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.find();
    res.status(200).json(catalogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single catalog entry by ID
exports.getCatalogById = async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update catalog entry
exports.updateCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });

    if (req.file) {
      catalog.catalog = req.file.path; // update catalog file path
    }
    await catalog.save();
    res.status(200).json({ message: 'Catalog updated successfully', data: catalog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete catalog entry
exports.deleteCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findByIdAndDelete(req.params.id);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });
    res.status(200).json({ message: 'Catalog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
