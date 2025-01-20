const express = require('express');
const multer = require('multer');
const router = express.Router();
const Gallery = require("../model/gallery")
const path = require('path');
const { uploadPhoto } = require('../middleware/fileUpload')
const { requireAuth } = require('../middleware/authmiddleware');
const fs = require('fs')


// Get all images
router.get('/getAll', async (req, res) => {
  try {
    const photo = await Gallery.find();
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Add a new image
router.post('/add', requireAuth, uploadPhoto, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    // Save the image paths and description to the database
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const title = req.body.title || 'No description provided';
    const alt = req.body.alt
    const imgTitle = req.body.imgTitle
    const newGallery = new Gallery({ photo, title, alt });
    await newGallery.save();

    res.status(200).json({ message: 'Images uploaded successfully', photo, title, alt, imgTitle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deleteGallery', requireAuth, async (req, res) => {
  const { id } = req.query;

  try {
    const gallery = await Gallery.findById(id);

    gallery.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file synchronously if it exists
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    if (!gallery) {
      return res.status(404).json({ message: 'gallery not found' });
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: 'gallery deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting gallery', error });
  }
});


// Download an image
router.get('/download/:filename', requireAuth, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../images', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'File download failed' });
    }
  });
});


router.get('/getgalleryById', requireAuth, async (req, res) => {
  const { id } = req.query;
  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ error: 'gallery not found' });
    }
    res.json({ data: gallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/updategallery', requireAuth, uploadPhoto, async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    // Fetch the existing gallery to get its current photos
    const existinggallery = await Gallery.findById(id);

    if (!existinggallery) {
      return res.status(404).json({ message: 'gallery not found' });
    }


    // Process new uploaded photos
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename); // Using filename to get the stored file names
      updateFields.photo = [...existinggallery.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existinggallery.photo;
    }

    const updatedgallery = await Gallery.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedgallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/:id/image/:imageFilename/:index', async (req, res) => {

  const { id, imageFilename, index } = req.params;

  try {
    // Find the gallery by ID
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: 'gallery not found' });
    }

    // Remove the photo and its alt text
    gallery.photo = gallery.photo.filter(photo => photo !== imageFilename);
    gallery.alt.splice(index, 1);
    gallery.imgTitle.splice(index, 1)

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await gallery.save();

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
