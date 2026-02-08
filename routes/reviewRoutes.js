const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", protect, createReview);
router.get("/:gameId", getReviews);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);
console.log(createReview);

module.exports = router;
