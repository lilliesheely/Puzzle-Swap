const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 

module.exports = {
    create, 
    index
}

function create(req, res){ 
    const message = new Message(req.body)
    message.sender = req.user._id; 
    message.recipient = req.params.ownerId;  
    message.puzzle = req.params.puzzleId; 
    message.save(function(err){
        res.redirect(`/messages?filter=sent`); 
    });
} 

function index(req, res){ 
    let query; 
    if (req.query.filter === 'received') {
        query = Message.find({recipient: req.user._id})
            .populate("puzzle")
            .sort("-updatedAt")
    } else { // sent messages
        query = Message.find({sender: req.user._id})
            .populate("puzzle")
            .sort("-updatedAt")
    }
    query.exec(function(err, messages){
        res.render('messages/index', {title: req.query.filter === 'received' ? 'Received Messages' : 'Sent Messages', messages});
    });
 }
