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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    background-color: #f5f5f5;
    color: #333;
}

.email-container {
    max-width: 600px;
    margin: 20px auto;
    background-color: gray/10;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

/* Header Styles */
.email-header {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
}

.company-logo {
    max-width: 150px;
    height: auto;
    margin-bottom: 10px;
}

.company-name {
    color: #2c3e50;
    font-size: 24px;
    font-weight: 600;
}

/* Notification Banner */
.notification-banner {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-text {
    font-size: 18px;
    font-weight: 500;
}

.timestamp {
    font-size: 14px;
    opacity: 0.9;
}

/* Inquiry Details */
.inquiry-details {
    padding: 20px;
}

.detail-card {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
}

.detail-item {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.detail-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.label {
    display: block;
    color: #6c757d;
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
}

.value {
    color: #2c3e50;
    font-size: 16px;
}

.message-text {
    white-space: pre-line;
    line-height: 1.5;
}

/* Footer Styles */
.email-footer {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
    border-top: 1px solid #e9ecef;
}

.disclaimer {
    margin-bottom: 10px;
}

.automated-notice {
    color: #6c757d;
    font-size: 14px;
}

.company-info {
    color: #6c757d;
    font-size: 12px;
}

/* Responsive Design */
@media screen and (max-width: 600px) {
    .email-container {
        margin: 10px;
        border-radius: 0;
    }

    .notification-banner {
        flex-direction: column;
        text-align: center;
    }

    .timestamp {
        margin-top: 5px;
    }
}
    </style>
</head>
<body>
<div class="email-container">
        <header class="email-header">
            <img src="https://shantipatra.com/api/logo/download/photo_1729923320922.png" class="company-logo" alt="Company Logo">
          
        </header>

        <div class="notification-banner">
            <div class="notification-text">New Inquiry Received</div> 
          

        <main class="inquiry-details">
            <div class="detail-card">
                <div class="detail-item">
                    <span class="label">Name</span>
                    <span class="value">${newInquiry.name}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Email</span>
                    <span class="value">${newInquiry.email}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Phone</span>
                    <span class="value">${newInquiry.phone}</span>
                </div>
                <div class="detail-item message">
                    <span class="label">Message</span>
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
