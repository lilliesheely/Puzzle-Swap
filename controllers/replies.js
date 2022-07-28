const Puzzle = require('../models/puzzle'); 
const Message = require('../models/message'); 

module.exports = {
   deleteReply, 
   createReply
}

async function deleteReply(req, res, next) { 
    try {
        const message = await Message.findOne({'replies._id': req.params.id, 'replies.user': req.user_id})
        if (!message) throw new Error('Not your message to delete!');
        message.replies.remove(req.params.id);   
        await message.save(); 
        res.redirect(`/messages/${message._id}`)
    } catch (err) {
        return next (err);
    }
} 

function createReply(req, res) {
    Message.findById(req.params.id, function (err, message) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        message.replies.push(req.body);
        message.save(function(err) {
        res.redirect(`/messages/${message._id}`);
        })
    });
}
