const WhyChoosePaper = require('../model/WhyChoosePaper');
const path = require('path');
const fs = require('fs');

// Get all benefits
const getAllWhyChoosePaper = async (req, res) => {
  try {
    const whyChoosePaper = await WhyChoosePaper.find();
    res.json(whyChoosePaper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Add a new benefit
const addWhyChoosePaper = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const { title, alt,imgTitle, description } = req.body;
    const newWhyChoosePaper = new WhyChoosePaper({ photo, title, alt,imgTitle, description });
    await newWhyChoosePaper.save();

    res.status(200).json({ message: 'WhyChoosePaper added successfully', photo, title, alt,imgTitle, description });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a benefit
const deleteWhyChoosePaper = async (req, res) => {
  const { id } = req.query;

  try {
    const whyChoosePaper = await WhyChoosePaper.findById(id);

    if (!whyChoosePaper) {
      return res.status(404).json({ message: 'Why Choose Paper not found' });
    }

    whyChoosePaper.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    await WhyChoosePaper.findByIdAndDelete(id);

    res.status(200).json({ message: 'Why Choose Paper deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting benefit', error });
  }
};

// Update a benefit
const updateWhyChoosePaper = async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    const existingWhyChoosePaper = await WhyChoosePaper.findById(id);

    if (!existingWhyChoosePaper) {
      return res.status(404).json({ message: 'Why Choose Paper not found' });
    }

    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      updateFields.photo = [...existingWhyChoosePaper.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingWhyChoosePaper.photo;
    }

    const updatedWhyChoosePaper = await WhyChoosePaper.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedWhyChoosePaper);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a benefit by ID
const getWhyChoosePaperById = async (req, res) => {
  const { id } = req.query; // Assuming ID is passed as a query parameter

  try {
    const whyChoosePaper = await WhyChoosePaper.findById(id);

    if (!whyChoosePaper) {
      return res.status(404).json({ error: 'Why Choose Paper not found' });
    }

    res.json({ data: whyChoosePaper });
  } catch (error) {
    console.log(error);
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
    const whyChoosePaper = await WhyChoosePaper.findById(id);

    if (!whyChoosePaper) {
      return res.status(404).json({ message: 'Benefit not found' });
    }

    // Remove the photo and its alt text
    whyChoosePaper.photo = whyChoosePaper.photo.filter(photo => photo !== imageFilename);
    whyChoosePaper.alt.splice(index, 1);
    whyChoosePaper.imgTitle.splice(index,1)

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await whyChoosePaper.save();

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWhyChoosePaper,
  addWhyChoosePaper,
  deleteWhyChoosePaper,
  updateWhyChoosePaper,
  getWhyChoosePaperById,
  downloadImage,
  deleteImageAndAltText,

};
