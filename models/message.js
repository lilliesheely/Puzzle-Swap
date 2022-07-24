const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema ({
    sender: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    message:{
        text: { type:String, required:true }
    }, 
    users: [{
        user: { 
            type:mongoose.Schema.Types.ObjectId, 
            ref:'User', 
            required: true 
        }
    }],
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: true 
    },
    read: { 
        type: Date 
    }
}, {
    timestamps: true 
})

