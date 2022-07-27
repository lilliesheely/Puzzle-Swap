const Puzzle = require('../models/puzzle'); 
const Message = require('../models/message'); 

module.exports = {
    create
}

function create(req, res) {
    Message.findById(req.params.id, function(err, message) {
        message.replies.push(req.body);
        message.save(function(err) {
        res.redirect(`/messages/${message._id}`);
        });
    });
}



