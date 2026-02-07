const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Review = require("../models/Review");

exports.createGame = async (req, res) => {
    try {
        const { title, genre, releaseDate, developerId } = req.body;

        const developer = await Developer.findById(developerId);
        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }

        const gameExists = await Game.findOne({ title });


        if (gameExists) {
            return res.status(400).json({ message: "Game already exists" });
        }

        const game = await Game.create({ title, genre, releaseDate, developer: developerId });
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        const { title, genre, releaseDate, developerId } = req.body;
        if (developerId) {
            const developer = await Developer.findById(developerId);
            if (!developer) {
                return res.status(404).json({ message: "Developer not found" });
            }
            game.developer = developerId;
        }
        game.title = title || game.title;
        game.genre = genre || game.genre;
        game.releaseDate = releaseDate || game.releaseDate;
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGames = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 5, 20);
        const skip = (page - 1) * limit;


        let sortOption = {createdAt: -1};

        if (req.query.sortBy === "releaseDate") {
            sortOption = { releaseDate: -1, createdAt: -1 };
        }

        if (req.query.sortBy === "old") {
            sortOption = { releaseDate: 1, createdAt: -1 };
        }

        const totalGames = await Game.countDocuments();

        const games = await Game.find()
            .populate("developer", "name")
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.json({
            totalGames, 
            currentPage: page, 
            totalPages: Math.ceil(totalGames / limit), 
            games,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('developer', 'name');
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        const reviews = await Review.find({ game: game._id }).populate("user", "username");

        const reviewCount = reviews.length;

        let userScore = 0;

        if (reviewCount > 0) {
            const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
            userScore = (totalScore / reviewCount).toFixed(1);
        }


        res.json({ game, reviews, reviewCount, userScore});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        await game.deleteOne();
        res.json({ message: "Game removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

