const Developer = require('../models/Developer');

exports.createDeveloper = async (req, res) => {
    try {
        const { name, founded, country } = req.body;

        const exists = await Developer.findOne({ name });
        if (exists) {
            return res.status(400).json({ message: "Developer already exists" });
        }

        const developer = await Developer.create({ name, founded, country });
        res.status(201).json(developer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDevelopers = async (req, res) => {
    try {
        const developers = await Developer.find();
        res.json(developers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDeveloperById = async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);

        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }

        res.json(developer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDeveloper = async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);

        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }

        await developer.remove();
        res.json({ message: "Developer removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
