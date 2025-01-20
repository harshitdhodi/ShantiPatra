const CustomizationSteps = require("../model/customizationsteps");

// Insert a new customization step
const insertCustomizationStep = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const customizationStep = new CustomizationSteps({
            title,
            description,
            status
        });

        await customizationStep.save();

        return res.status(201).send({
            message: "Customization step created successfully",
            customizationStep: customizationStep
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all customization steps with pagination
const getCustomizationSteps = async (req, res) => {
    try {
        const customizationSteps = await CustomizationSteps.find()
        res.status(200).json({
            data: customizationSteps,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const getActiveCustomizationSteps = async (req, res) => {
    try {
        const customizationSteps = await CustomizationSteps.find({status:'active'})
        res.status(200).json({
            data: customizationSteps,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update a customization step by ID
const updateCustomizationStep = async (req, res) => {
    const { id } = req.query; // Assuming id is passed as a query parameter
    const updateFields = req.body;

    try {
        const existingCustomizationStep = await CustomizationSteps.findById(id);
        if (!existingCustomizationStep) {
            return res.status(404).send("Customization step not found");
        }

        // Find CustomizationStep by ID and update
        const updatedCustomizationStep = await CustomizationSteps.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updatedCustomizationStep) {
            return res.status(404).json({ error: 'Customization step not found' });
        }

        res.status(200).json({ message: 'Customization step updated successfully', data: updatedCustomizationStep });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a customization step by ID
const deleteCustomizationStep = async (req, res) => {
    try {
        const { id } = req.query;
        const customizationStep = await CustomizationSteps.findByIdAndDelete(id);

        if (!customizationStep) {
            return res.status(404).send({ message: 'Customization step not found' });
        }
        res.send({ message: "Customization step deleted successfully" }).status(200);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get a customization step by ID
const getCustomizationStepById = async (req, res) => {
    try {
        const { id } = req.query;
        const customizationStep = await CustomizationSteps.findById(id);
        if (!customizationStep) {
            return res.status(404).json({ message: "Customization step not found" });
        }

        res.status(200).json({ data: customizationStep });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = { insertCustomizationStep, getCustomizationSteps,getActiveCustomizationSteps, updateCustomizationStep, deleteCustomizationStep, getCustomizationStepById };
