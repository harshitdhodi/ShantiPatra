const Aboutus = require('../model/aboutus');
const path = require('path')
const fs = require('fs')



exports.getAboutus = async (req, res) => {
  try {
    const aboutus = await Aboutus.findOne();
    res.status(200).json(aboutus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getActiveAboutus = async (req, res) => {
  try {
    const aboutus = await Aboutus.findOne({ status: 'active' });
    if (!aboutus) {
      return res.status(404).json({ message: "No active 'About Us' record found." });
    }
    res.status(200).json(aboutus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Update a specific page content by ID
exports.updateAboutus = async (req, res) => {
  const updateFields = req.body;

  try {
    // Process new uploaded photos
    let newPhotoPaths = [];
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      newPhotoPaths = req.files['photo'].map(file => file.filename); // Using filename to get the stored file names
    }

    // Fetch the existing page content to get its current photos
    const existingPageContent = await Aboutus.findOne();

    // Set the photo field: combine existing photos with new ones, if any
    const photos = existingPageContent ? [...existingPageContent.photo, ...newPhotoPaths] : newPhotoPaths;
    // Update or create the page content
    const updatedPageContent = await Aboutus.findOneAndUpdate(
      {},
      { ...updateFields, photo: photos }, // Merge updateFields with the photos array
      { new: true, upsert: true, runValidators: true } // Upsert option to create a new document if none is found
    );

    res.status(200).json(updatedPageContent);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete a specific page content by ID
// exports.deleteAboutusById = async (req, res) => {
//   try {
//     const { id } = req.query;

//     const pageContent = await PageContent.findById(id);

//     pageContent.photo.forEach(filename => {
//       const filePath = path.join(__dirname, '../images', filename);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       } else {
//         console.warn(`File not found: ${filename}`);
//       }
//     });

//     const deletedPageContent = await PageContent.findByIdAndDelete(id);
//     if (!deletedPageContent) {
//       return res.status(404).json({ message: 'Page content not found' });
//     }
//     res.status(200).json({ message: 'Page content deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deletePhotoAndAltText = async (req, res) => {

  const {  imageFilename, index } = req.params;

  try {
    // Find the service by ID
    const pageContent = await Aboutus.findOne();

    if (!pageContent) {
      return res.status(404).json({ message: 'pageContent not found' });
    }

    // Remove the photo and its alt text
    pageContent.photo = pageContent.photo.filter(photo => photo !== imageFilename);
    pageContent.alt.splice(index, 1);
    pageContent.imgTitle.splice(index,1)

    await pageContent.save();

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Photo,image title and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};


