const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema ({
    requester: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    senderName: String, 
    senderAvatar: String,
    owner: {
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
    sent: Boolean
}, {
    timestamps: true 
})

module.exports = mongoose.model('Message', messageSchema);