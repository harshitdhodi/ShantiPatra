const Banner = require('../model/banner');
const path=require('path')
const fs=require('fs')


const insertBanner = async (req, res) => {
  try {
    const { section, title, details, alt,imgTitle, status, priority } = req.body;
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];

    // Increment priorities for existing banners in the same section with higher or equal priority
    await Banner.updateMany({ section, priority: { $gte: parseInt(priority) } }, { $inc: { priority: 1 } });

    const newBanner = new Banner({
      section,
      title,
      photo,
      alt,
      imgTitle,
      details,
      status,
      priority: parseInt(priority) // Ensure priority is parsed as an integer
    });

    await newBanner.save();

    res.status(200).json({
      data: newBanner,
      message: "Your data inserted successfully",
    });
  } catch (err) {
    console.error("Error inserting banner:", err);
    res.status(400).send(err);
  }
};

const getCountBySection = async (req, res) => {
  try {
    const { section } = req.query;
    const count = await Banner.countDocuments({ section });
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBanner = async (req, res) => {
    try {

        const {page = 1} = req.query;
        const limit = 5;
        const count = await Banner.countDocuments(); 
        const banners = await Banner.find()
        .skip((page - 1) * limit) // Skip records for previous pages
        .limit(limit);
        res.status(200).json({
            data: banners,
            total: count,
            currentPage: page,
            hasNextPage: count > page * limit,
            message: "Banners fetched successfully",
        });
    } catch (err) {
        console.error("Error fetching banners:", err);
        res.status(400).send(err);
    }
};


// Handle PUT request to update a banner
const updateBanner = async (req, res) => {
  const { id } = req.query;
  const { section, title,alt,imgTitle, details, status, priority} = req.body;


  try {
    let banner = await Banner.findOne({ _id: id, section });

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    const oldPriority = banner.priority;

    banner.section = section;
    banner.title = title; 
    banner.details = details;
    banner.status = status;
    banner.priority = parseInt(priority);
    banner.alt=alt;
    banner.imgTitle = imgTitle;
  

    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      banner.photo = [...banner.photo, ...newPhotoPaths];
    }else{
      banner.photo = banner.photo;
    }

    // Adjust priorities if priority has changed
    if (oldPriority !== parseInt(priority)) {
      if (oldPriority < parseInt(priority)) {
        await Banner.updateMany(
          { section, _id: { $ne: banner._id }, priority: { $gte: oldPriority + 1, $lte: parseInt(priority) } },
          { $inc: { priority: -1 } }
        );
      } else {
        await Banner.updateMany(
          { section, _id: { $ne: banner._id }, priority: { $gte: parseInt(priority), $lte: oldPriority - 1 } },
          { $inc: { priority: 1 } }
        );
      }
    }

    banner = await banner.save();

    res.status(200).json({ message: 'Banner updated successfully', data: banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const countBanner = async (req, res) => {
  try {
    const count = await Banner.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting services' });
  }
};




const deleteBanner = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the banner by ID
    const bannerToDelete = await Banner.findById(id);

    if (!bannerToDelete) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Retrieve section and priority for later use
    const { section, priority } = bannerToDelete;

    // Delete associated photos from disk
    await Promise.all(
      bannerToDelete.photo.map(async (filename) => {
        const filePath = path.join(__dirname, '../images', filename); // Adjust the path as per your file structure
        try {
          await fs.unlink(filePath); // Delete the file asynchronously
        } catch (error) {
          console.warn(`Failed to delete file: ${filename}`, error);
        }
      })
    );

    // Delete the banner from database
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Adjust priorities for banners in the same section
    await Banner.updateMany(
      { section, priority: { $gt: priority } },
      { $inc: { priority: -1 } }
    );

    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Failed to delete banner' });
  }
};


  const getBannerById = async (req, res) => {
    try {
      const { id } = req.query;
  
      const banner = await Banner.findById(id);
     
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.status(200).json({ data: banner });
    } catch (error) {
   
      res.status(500).json({ message: "Server error" });
    }
  }

 
  
  const deletePhotoAndAltText = async (req, res) => {

    const { id, imageFilename, index } = req.params;
  
  
    try {
     
      const banner = await Banner.findById(id);
  
      if (!banner) {
        return res.status(404).json({ message: 'Service not found' });
      }

      banner.photo = banner.photo.filter(photo => photo !== imageFilename);
      banner.alt.splice(index, 1);
      banner.imgTitle.splice(index,1);
  
      await banner.save();

      const filePath = path.join(__dirname, '..', 'images', imageFilename);

      // Check if the file exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      res.json({ message: 'Photo ,alt text and Image Title deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getBannersBySectionHome = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Home',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for home section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching home section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionAboutus = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'About Us',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for home section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching About us section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionCalculator = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Calculator',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Calculator section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Calculator us section banners:", err);
      res.status(400).send(err);
    }
  };
  
  const getBannersBySectionContactus = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Contact Us',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for home section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionProducts = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Product',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Products section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionBlog = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Blog',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Products section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionCustomPackaging = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Manufacture',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Products section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  };

  const getBannersBySectionGlobal = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'GlobalPresence',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Global Presence section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  }; 
  const getBannersBySectionClients = async (req, res) => {
    try {
      const banners = await Banner.find({ section: 'Our Clients',status: 'active' }).sort({ priority: 1 });;
      res.status(200).json({
        data: banners,
        message: "Banners for Products section fetched successfully",
      });
    } catch (err) {
      console.error("Error fetching Cotact Us section banners:", err);
      res.status(400).send(err);
    }
  };

  

module.exports = {getBannersBySectionCustomPackaging , getBannersBySectionCalculator ,getBannersBySectionGlobal,getBannersBySectionClients,getBannersBySectionBlog,getBannersBySectionContactus,getBannersBySectionProducts, getBannersBySectionAboutus,insertBanner, getBanner ,getBannersBySectionHome,getCountBySection,updateBanner , deleteBanner , getBannerById,deletePhotoAndAltText,countBanner };
