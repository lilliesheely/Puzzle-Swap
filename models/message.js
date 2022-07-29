const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repliesSchema = new Schema ({
    msg: String,
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    userName: String, 
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
    replies: [repliesSchema], 
    puzzle: {
        type: Schema.Types.ObjectId, 
        ref: 'Puzzle'
    } 
}, {
    timestamps: true 
})

module.exports = mongoose.model('Message', messageSchema);