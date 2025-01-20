const WhyChooseUs = require('../model/WhyChooseUs');
const path = require('path');
const fs = require('fs');

// Get all benefits
const getAllWhyChooseUs = async (req, res) => {
  try {
    const whyChooseUs = await WhyChooseUs.find();
    res.json(whyChooseUs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new benefit
const addWhyChooseUs = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const { title, alt, imgTitle, description } = req.body;
    const newWhyChooseUs = new WhyChooseUs({ photo, title, alt, imgTitle, description });
    await newWhyChooseUs.save();

    res.status(200).json({ message: 'Why Choose Us added successfully', photo, title, alt,imgTitle, description });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

// Delete a benefit
const deleteWhyChooseUs = async (req, res) => {
  const { id } = req.query;

  try {
    const whyChooseUs = await WhyChooseUs.findById(id);

    if (!whyChooseUs) {
      return res.status(404).json({ message: 'Why Choose Us not found' });
    }

    whyChooseUs.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    await WhyChooseUs.findByIdAndDelete(id);

    res.status(200).json({ message: 'whyChooseUs deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting benefit', error });
  }
};

// Update a benefit
const updateWhyChooseUs = async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    const existingWhyChooseUs = await WhyChooseUs.findById(id);

    if (!existingWhyChooseUs) {
      return res.status(404).json({ message: 'Benefit not found' });
    }

    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      updateFields.photo = [...existingWhyChooseUs.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingWhyChooseUs.photo;
    }

    const updatedWhyChooseUs = await WhyChooseUs.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedWhyChooseUs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a benefit by ID
const getWhyChooseUsById = async (req, res) => {
  const { id } = req.query; // Assuming ID is passed as a query parameter

  try {
    const whyChooseUs = await WhyChooseUs.findById(id);

    if (!whyChooseUs) {
      return res.status(404).json({ error: 'whyChooseUs not found' });
    }

    res.json({ data: whyChooseUs });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Download image
const downloadImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../images', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'File download failed' });
    }
  });
};

// Delete image and its alt text
const deleteImageAndAltText = async (req, res) => {
  const { id, imageFilename, index } = req.params;

  try {
    const whyChooseUs = await WhyChooseUs.findById(id);

    if (!whyChooseUs) {
      return res.status(404).json({ message: 'Benefit not found' });
    }

    // Remove the photo and its alt text
    whyChooseUs.photo = whyChooseUs.photo.filter(photo => photo !== imageFilename);
    whyChooseUs.alt.splice(index, 1);
    whyChooseUs.imgTitle.splice(index,1)


    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await whyChooseUs.save();

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWhyChooseUs,
  addWhyChooseUs,
  deleteWhyChooseUs,
  updateWhyChooseUs,
  getWhyChooseUsById,
  downloadImage,
  deleteImageAndAltText
};
