const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema ({
    messages: String
}, {
    timestamps: true
})

const messageSchema = new Schema ({
    requester: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    requesterName: String, 
    requesterAvatar: String,
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    ownerName: String, 
    ownerAvatar: String,
    read: {
        type: Boolean,
        default: false
    }, 
    content: [conversationSchema], 
    puzzle: {
        type: Schema.Types.ObjectId, 
        ref: 'Puzzle'
    }, 
    sent: Boolean
}, {
    timestamps: true 
})

module.exports = mongoose.model('Message', messageSchema);