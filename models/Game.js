const Mongoose = require('mongoose');

const gameSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
    },
    developer: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
    },
}, { timestamps: true });

module.exports = Mongoose.model('Game', gameSchema); 
