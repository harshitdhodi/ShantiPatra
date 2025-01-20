const WhyChooseUsCounter = require('../model/WhyChooseUsCounter');
const path = require('path');
const fs = require('fs');



// Get all WhyChooseUsCounters
exports.getWhyChooseUsCounters = async (req, res) => {
  try {
    const whyChooseUsCounters = await WhyChooseUsCounter.findOne();
    res.status(200).json(whyChooseUsCounters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching WhyChooseUsCounters', error });
  }
};

// Update a WhyChooseUsCounter by ID
exports.updateWhyChooseUsCounter = async (req, res) => {
  try {
    const { title, alt, imgTitle, no, sign, status } = req.body;
    let photo = req.body.photo;

    if (req.file) {
      photo = req.file.filename;
    }
    const updatedWhyChooseUsCounter = await WhyChooseUsCounter.findOneAndUpdate(
      {},
      { title, no, alt, imgTitle, photo, sign, status },
      { new: true, runValidators: true, upsert: true }
    );
    if (!updatedWhyChooseUsCounter) {
      return res.status(404).json({ message: 'WhyChooseUsCounter not found' });
    }
    res.status(200).json(updatedWhyChooseUsCounter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating WhyChooseUsCounter', error });
  }
};

exports.deletePhotoAndAltText = async (req, res) => {

  const { imageFilename, index } = req.params;
  try {
    // Find the service by ID
    const whyChooseUsCounter = await WhyChooseUsCounter.findOne();

    if (!whyChooseUsCounter) {
      return res.status(404).json({ message: 'whyChooseUsCounter not found' });
    }

    // Remove the photo and its alt text
    whyChooseUsCounter.photo = whyChooseUsCounter.photo.filter(photo => photo !== imageFilename);
    whyChooseUsCounter.alt.splice(index, 1);
    whyChooseUsCounter.imgTitle.splice(index, 1)

    await whyChooseUsCounter.save();

    const filePath = path.join(__dirname, '..', 'logos', imageFilename);

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
