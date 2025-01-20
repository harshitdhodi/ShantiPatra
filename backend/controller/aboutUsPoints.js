const AboutUsPoints = require('../model/aboutuspoints');

// Create a new AboutUs Point
exports.createAboutUsPoint = async (req, res) => {
    try {
        const { title, points, status } = req.body;

        const newPoint = new AboutUsPoints({
            title,
            points, // points is now an array
            status,
        });

        await newPoint.save();
        res.status(201).json({ message: 'About Us point created successfully', data: newPoint });
    } catch (error) {
        res.status(500).json({ message: 'Error creating point', error });
    }
};


// Get all AboutUs Points
exports.getAllAboutUsPoints = async (req, res) => {
    try {
        const points = await AboutUsPoints.find();
        res.status(200).json({ data: points });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching points', error });
    }
};

// Get a single AboutUs Point by ID
exports.getAboutUsPointById = async (req, res) => {
    try {
        const point = await AboutUsPoints.findById(req.params.id);
        if (!point) {
            return res.status(404).json({ message: 'Point not found' });
        }
        res.status(200).json({ data: point });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching point', error });
    }
};

// Update an AboutUs Point by ID
// Update an AboutUs Point by ID
exports.updateAboutUsPoint = async (req, res) => {
    try {
        const { title, points, status } = req.body;

        const updatedPoint = await AboutUsPoints.findByIdAndUpdate(
            req.params.id,
            { title, points, status }, // points will be updated as an array
            { new: true }
        );

        if (!updatedPoint) {
            return res.status(404).json({ message: 'Point not found' });
        }

        res.status(200).json({ message: 'Point updated successfully', data: updatedPoint });
    } catch (error) {
        res.status(500).json({ message: 'Error updating point', error });
    }
};


// Delete an AboutUs Point by ID
exports.deleteAboutUsPoint = async (req, res) => {
    try {
        const deletedPoint = await AboutUsPoints.findByIdAndDelete(req.params.id);

        if (!deletedPoint) {
            return res.status(404).json({ message: 'Point not found' });
        }

        res.status(200).json({ message: 'Point deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting point', error });
    }
};
