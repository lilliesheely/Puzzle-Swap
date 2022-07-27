const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 
const User = require('../models/user'); 

module.exports = {
    create, 
    index,
    show, 
    createReply
}

function create(req, res){ 
    const message = new Message()
    message.content = req.body
    message.requester = req.user._id; 
    message.owner = req.params.ownerId;  
    message.puzzle = req.params.puzzleId; 
    req.body.userName = req.user.name; 
    req.body.userAvatar = req.user.avatar; 
    message.sent = true; 
    message.save(function(err, messages){
        res.redirect(`/messages/${message._id}`, messages); 
    });
} 

function index(req, res){ 
    let query; 
    if (req.query.filter === 'received') {
        query = Message.find({owner: req.user._id})
            .populate("puzzle")
            .sort("-updatedAt")
    } else { // sent messages
        query = Message.find({requester: req.user._id})
            .populate("puzzle")
            .sort("-updatedAt")
    }
    query.exec(function(err, messages){
        res.render('messages/index', {title: req.query.filter === 'received' ? 'Received Messages' : 'Sent Messages', messages});
    });
}

function show(req, res) {
    Message.findById(req.params.id)
        .populate('content')
        .exec(function(err, puzzle, message) {
        res.render('messages/show', {title: 'Message Detail', puzzle, message});
    });
};
    
function createReply(req, res){ 
    const message = Message.findById(req.params.id, function(err, message){ 
        message.content.push(req.body);
        message.save(function(err, message) {
        res.redirect(`/messages/${message._id}`, message); 
        });
    });
} 