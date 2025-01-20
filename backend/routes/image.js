const express = require('express');
const router = express.Router();
const path = require('path')


router.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../images', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'File download failed' });
        }
    });
});

router.get('/view/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../images', filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline'); // Set to 'inline' to view in browser

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'File display failed' });
        }
    });
});

router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../images', filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline'); // Set to 'inline' to view in browser

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'File display failed' });
        }
    });
});

module.exports = router;