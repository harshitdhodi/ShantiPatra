const Footer = require('../model/footer');

// Get the footer data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the footer data
exports.updateFooter = async (req, res) => {
  const {address, phoneNo, email,location } = req.body;
  
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer({
        address,
        phoneNo,
        email,
        location
      });

      const newFooter = await footer.save();
      return res.status(201).json(newFooter);
    }

    footer.address = address;
    footer.phoneNo = phoneNo;
    footer.email = email;
    footer.location = location;
   
    const updatedFooter = await footer.save();
    res.json(updatedFooter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


