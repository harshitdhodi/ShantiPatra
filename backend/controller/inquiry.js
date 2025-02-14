const Inquiry = require('../model/inquiry');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'orbit9.gingerservers.com', // Hostname for Gmail SMTP
  port: 465, // Secure SSL port (or use 587 for TLS)
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.createInquiry = async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // HTML Email Template
    const emailHTML = `
    <!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>New Inquiry</title>
 <style>
    /* Reset default styles */
/* General Styling */
body {

 background-color: #f4f4f4;
 color: #333;
 margin: 0;
 padding: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
}

/* Notification Banner */
.notification-banner {
 background-color: #ffffff;
 border-radius: 8px;
 box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
 width: 100%;
 max-width: 500px;
 padding: 20px;
 text-align: center;
}

/* Notification Header */
.notification-text {
 font-size: 18px;
 font-weight: bold;
 color: #007bff;
 padding-bottom: 10px;
 border-bottom: 2px solid #007bff;
}

/* Inquiry Details */
.inquiry-details {
 margin-top: 15px;
}

.detail-card {
 background-color: #f9f9f9;
 border-radius: 6px;
 padding: 15px;
 box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-item {
 display: flex;
 justify-content: space-between;
 padding: 8px 0;
 border-bottom: 1px solid #ddd;

}

.detail-item:last-child {
 border-bottom: none;
}

.label {
 font-weight: bold;
 color: #555;
}

.value {
 color: #222;
}

/* Message Styling */
.message {
 display: flex;
 flex-direction: column;
 align-items: flex-start;
}

.message-text {
 margin-top: 5px;
 font-style: italic;
 color: #444;
}
/* Header Styling */
.image {
 text-align: center;
 margin-bottom: 15px;
}

/* Company Logo Styling */
.company-logo {
 max-width: 150px; /* Adjust the size as needed */
 height: auto;
 border-radius: 8px; /* Soft rounded edges */
 box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for elegance */
}

/* Footer */
.email-footer {
 margin-top: 15px;
 text-align: center;
 font-size: 12px;
 color: #777;
}

.automated-notice {
 font-style: italic;
 color: #888;
}

.company-info {
 margin-top: 5px;
 font-weight: bold;
 color: #555;
}

 </style>
</head>
<body>
<div class="email-container">


     <div class="notification-banner">
         <header class="email-header">
         <img src="https://shantipatra.com/api/logo/download/photo_1729923320922.png" class="company-logo" alt="Company Logo">
       
     </header>
       

     <main class="inquiry-details">
         <div class="detail-card">
             <div class="detail-item">
                 <span class="label">Name : </span>
                 <span class="value"> ${newInquiry.name}</span>
             </div>
             <div class="detail-item">
                 <span class="label">Email : </span>
                 <span class="value"> ${newInquiry.email}</span>
             </div>
             <div class="detail-item">
                 <span class="label">Phone : </span>
                 <span class="value"> ${newInquiry.phone}</span>
             </div>
             <div class="detail-item message">
                 <div class="label">Message: </div>
                 <p class="value message-text">${newInquiry.message}</p>
             </div>
         </div>
     </main>

     <footer class="email-footer">
         <div class="disclaimer">
             <i class="automated-notice">This is an automated email. Please do not reply.</i>
         </div>
         <div class="company-info">
             <p>© 2025 Shanti Patra. All rights reserved.</p>
         </div>
     </footer>
 </div>
</body>
</html>
     `;

        const mailOptions = {
          from: `"${newInquiry.name}"`, // User's name as display, your email for actual sending
          to: process.env.EMAIL_FROM,
          subject: 'New Inquiry',
          html: emailHTML,
          replyTo: newInquiry.email // Reply goes directly to the user's email
        };
        
        

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get counts and data based on field presence
exports.getCountsAndData = async (req, res) => {
  try {
    const totalCount = await Inquiry.countDocuments();

    const countWithFields = await Inquiry.countDocuments({
      $or: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    const countWithoutFields = await Inquiry.countDocuments({
      $nor: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    const dataWithFields = await Inquiry.find({
      $or: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    const dataWithoutFields = await Inquiry.find({
      $nor: [
        { utm_source: { $exists: true, $ne: '' } },
        { utm_medium: { $exists: true, $ne: '' } },
        { utm_campaign: { $exists: true, $ne: '' } },
        { utm_id: { $exists: true, $ne: '' } },
        { gclid: { $exists: true, $ne: '' } },
        { gcid_source: { $exists: true, $ne: '' } }
      ]
    });

    const inquiries = await Inquiry.find();

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

exports.deleteInquiry = async (req, res) => {
  const { id } = req.query;
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
