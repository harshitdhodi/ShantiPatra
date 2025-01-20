const CustomInquiry = require('../model/custominquiries');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like 'Mailgun', 'SendGrid', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// POST: Create a new inquiry
exports.createInquiry = async (req, res) => {
  try {
    // Create a new product inquiry
    const newInquiry = new CustomInquiry(req.body);
    await newInquiry.save();

    const emailHTML = `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            max-width: 600px;
            margin: 20px auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center; /* Center the heading */
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .field {
            font-weight: bold;
            color: #333;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
            text-align: center;
        }
        .centered-text {
            text-align: center; /* Center text */
            margin: 20px 0; /* Add margin above and below */
            font-size: 20px; /* Adjust font size as needed */
            color: #333; /* Text color */
        }
    </style>
</head>
<body>
    <div class="container">
       <h2>MAGNUMPACK</h2>
        <p class="centered-text">New Inquiry!!</p>
        <p><span class="field">Name:</span> ${newInquiry.name}</p>
        <p><span class="field">Company:</span> ${newInquiry.company || 'N/A'}</p>
        <p><span class="field">Email:</span> ${newInquiry.email}</p>
        <p><span class="field">Phone:</span> ${newInquiry.phone}</p>
        <p><span class="field">Product 1:</span> ${newInquiry.product1 || 'N/A'}</p>
        <p><span class="field">Quantity 1:</span> ${newInquiry.quantity1 || 'N/A'}</p>
        <p><span class="field">Product 2:</span> ${newInquiry.product2 || 'N/A'}</p>
        <p><span class="field">Quantity 2:</span> ${newInquiry.quantity2 || 'N/A'}</p>
        <p><span class="field">Message:</span></p>
        <p>${newInquiry.message}</p>
        <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
        `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_FROM,
      subject: 'New Inquiry',
      html: emailHTML
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET: Retrieve all inquiries
exports.getCountsAndData = async (req, res) => {
  try {
    // Count all documents
    const totalCount = await CustomInquiry.countDocuments();

    // Count documents with any of the specified fields
    const countWithFields = await CustomInquiry.countDocuments({
      $or: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    // Count documents without any of the specified fields
    const countWithoutFields = await CustomInquiry.countDocuments({
      $nor: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    // Fetch data of documents with any of the specified fields
    const dataWithFields = await CustomInquiry.find({
      $or: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    const dataWithoutFields = await CustomInquiry.find({
      $nor: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });


    const inquiries = await CustomInquiry.find();

    res.status(200).json({
      totalCount,
      countWithFields,
      countWithoutFields,
      dataWithFields,
      dataWithoutFields,
      inquiries
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Delete an inquiry by ID
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.query
    const inquiry = await CustomInquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
