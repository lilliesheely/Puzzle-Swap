const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puzzleSchema = new Schema ({
    image: String,
    name: String, 
    description: String, 
    pieceAmount: Number, 
    dimensions: String, 
    difficultyRating: String, 
    user: {type: Schema.Types.ObjectId, ref: "User"}, 
    userName: String, 
    userAvatar: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Puzzle', puzzleSchema);