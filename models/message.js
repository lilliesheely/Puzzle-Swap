const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema ({
    sender: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    recipient: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    read: {
        type: Boolean,
        default: false
    }, 
    body: String, 
    puzzle: {
        type: Schema.Types.ObjectId, 
        ref: 'Puzzle'
    }, 
}, {
    timestamps: true 
})

module.exports = mongoose.model('Message', messageSchema);