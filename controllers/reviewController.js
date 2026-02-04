const Review = require("../models/Review");

exports.createReview = async (req, res) => {
    try {
        const { gameTitle, rating, comment } = req.body;

        if (!gameTitle || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const review = await Review.create({
            user: req.user._id,
            gameTitle,
            rating,
            comment,
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({user: req.user._id});
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        const updatedReview = await review.save();
        res.json(updatedReview);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await review.remove();
        res.json({ message: "Review removed" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};