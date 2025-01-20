const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const cron = require('node-cron');
const { exportAndBackupAllCollectionsmonthly } = require("./controller/Backup")
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();


const productRoute = require('./routes/product');
const newsRoute = require('./routes/news');
const pageHeadingRoute = require('./routes/pageHeading');
const imagesRoute = require('./routes/image');
const testimonialRoute = require('./routes/testinomial');
const ourStaff = require('./routes/ourStaff');
const banner = require('./routes/Banner');
const aboutus = require('./routes/abotus');
const adminRoutes = require('./routes/admin');
const forgotPassword = require('./routes/forgotpassword')
const emailRoutes = require('./routes/email');
const logoRoutes = require("./routes/logo")
const BackupRoutes = require("./routes/backup")
const Achievements = require("./routes/achievements")
const Counter = require("./routes/counter")
const inquiries = require("./routes/inquiry")
const mission = require("./routes/mission")
const vision = require("./routes/vision")
const footer = require("./routes/footer")
const header = require("./routes/header")
const googlesettings = require("./routes/googlesettings")
const menulisting = require("./routes/menulisting")
const sitemap = require("./routes/sitemap")
const whyChooseUs = require("./routes/whyChooseUs")
const whyChoosePaper = require("./routes/WhyChoosePaper")
const whyChooseUsCounter = require("./routes/whychooseuscounter")
const productDetail = require("./routes/productdetail")
const ProductInquiry = require("./routes/productinquiry")
const CustomizationSteps = require("./routes/customizationsteps")
const CustomInquiry = require("./routes/custominquires")
const Colors=require("./routes/managecolor")
const AboutUsPoint = require("./routes/aboutUsPoints")
const Client = require("./routes/Clients")
const gallery = require("./routes/Gallery")
const globalpresence = require("./routes/globalpresence")
const strappingPoint = require("./routes/strappingPoints")
const boppTable = require("./routes/boppTable")
const strengthPoint = require("./routes/strengthPoints")
const catalog = require("./routes/catalog")
const allSlugs = require("./routes/AllSlugs")
const pdfRoute = require("./routes/pdf")

app.use(express.json());

app.use(cookieParser());

//   app.use(cors({
//     origin: 'http://localhost:3000', 
//     credentials: true,
//     exposedHeaders: ['x-filename'] 
// }));

cron.schedule('59 23 31 * *', () => {

    exportAndBackupAllCollectionsmonthly();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Static file serving
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Use routes
app.use('/api/product', productRoute);
app.use('/api/news', newsRoute);
app.use('/api/pageHeading', pageHeadingRoute);
app.use('/api/image', imagesRoute);
app.use('/api/testimonial', testimonialRoute);
app.use('/api/staff', ourStaff);
app.use('/api/banner', banner);
app.use('/api/aboutus', aboutus);
app.use('/api/admin', adminRoutes);
app.use('/api/password', forgotPassword)
app.use('/api/email', emailRoutes);
app.use('/api/logo', logoRoutes);
app.use('/api/backup', BackupRoutes);
app.use("/api/achievements", Achievements)
app.use("/api/counter", Counter)
app.use("/api/inquiries", inquiries)
app.use("/api/mission", mission)
app.use("/api/vision", vision)
app.use("/api/footer", footer)
app.use("/api/header", header)
app.use("/api/googlesettings", googlesettings)
app.use("/api/menulisting", menulisting)
app.use("/api/sitemap", sitemap)
app.use("/api/whyChooseUs", whyChooseUs)
app.use("/api/whyChoosePaper", whyChoosePaper)
app.use("/api/whyChooseUsCounter", whyChooseUsCounter)
app.use("/api/productDetail", productDetail)
app.use("/api/productInquiry", ProductInquiry)
app.use("/api/customizationsteps", CustomizationSteps)
app.use("/api/custominquiry", CustomInquiry)
app.use("/api/colors", Colors)
app.use("/api/aboutUsPoint", AboutUsPoint)
app.use("/api/client",Client)
app.use("/api/gallery",gallery)
app.use("/api/globalpresence" , globalpresence)
app.use("/api/strappingPoint" , strappingPoint)
app.use("/api/boppTable" , boppTable)
app.use("/api/strengthPoint" , strengthPoint)
app.use("/api/catalog", catalog)

// Add static file serving for PDFs 
// app.use('/pdf', express.static(path.join(__dirname, 'uploads')));

// Keep the general static file serving
app.use(express.static(path.join(__dirname, 'dist')));
 
// Add this route before the catch-all route
app.get('/catalog.pdf', (req, res) => {
    const catalogPath = path.join(__dirname, 'uploads', 'catalog.pdf');
    
    if (fs.existsSync(catalogPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=catalog.pdf');
        res.sendFile(catalogPath);
    } else {
        res.status(404).send('Catalog PDF not found. Please contact administrator.');
    }
});

// Keep the catch-all route last 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
