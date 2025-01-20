const express = require('express');
const multer = require('multer');
const router = express.Router();
const Client = require("../model/Clients")
const path = require('path');
const { uploadPhoto } = require('../middleware/fileUpload')
const { requireAuth } = require('../middleware/authmiddleware');
const fs = require('fs')


// Get all images
router.get('/getAll', async (req, res) => {
  try {
    const photo = await Client.find();
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
    const newClient = new Client({ photo, title, alt });
    await newClient.save();

    res.status(200).json({ message: 'Images uploaded successfully', photo, title, alt, imgTitle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deleteClient', requireAuth, async (req, res) => {
  const { id } = req.query;

  try {
    const Client = await Client.findById(id);

    Client.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file synchronously if it exists
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    if (!Client) {
      return res.status(404).json({ message: 'Clients not found' });
    }

    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: 'Clients deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting Clients', error });
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


router.get('/getClientsById', requireAuth, async (req, res) => {
  const { id } = req.query;
  try {
    const Clients = await Client.findById(id);
    if (!Clients) {
      return res.status(404).json({ error: 'Clients not found' });
    }
    res.json({ data: Clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/updateClients', requireAuth, uploadPhoto, async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    // Fetch the existing Clients to get its current photos
    const existingClients = await Client.findById(id);

    if (!existingClients) {
      return res.status(404).json({ message: 'Clients not found' });
    }


    // Process new uploaded photos
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename); // Using filename to get the stored file names
      updateFields.photo = [...existingClients.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingClients.photo;
    }

    const updatedClients = await Client.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedClients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/:id/image/:imageFilename/:index', async (req, res) => {

  const { id, imageFilename, index } = req.params;

  try {
    // Find the Clients by ID
    const Clients = await Client.findById(id);

    if (!Clients) {
      return res.status(404).json({ message: 'Clients not found' });
    }

    // Remove the photo and its alt text
    Clients.photo = Clients.photo.filter(photo => photo !== imageFilename);
    Clients.alt.splice(index, 1);
    Clients.imgTitle.splice(index, 1)

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Clients.save();

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
