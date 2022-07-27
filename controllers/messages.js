const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 
const User = require('../models/user'); 

module.exports = {
    create, 
    index,
    show, 
}

function create(req, res){ 
    const message = new Message()
    message.requestMessage = req.body
    message.requester = req.user._id; 
    message.owner = req.params.ownerId;  
    message.puzzle = req.params.puzzleId;
    message.replies = [];  
    req.body.userName = req.user.name; 
    req.body.userAvatar = req.user.avatar; 
    message.save(function(err){
        res.redirect(`/messages`); 
    });
} 

function index(req, res){ 
    Message.find({ $or: [{owner: req.user._id}, {requester: req.user._id} ]}, function(err, messages){
        res.render('messages/index', {title: 'All Messages', messages})
    })

    // let query; 
    // if (req.query.filter === 'received') {
    //     query = Message.find({owner: req.user._id})
    //         .populate("puzzle")
    //         .sort("-updatedAt")
    // } else { // sent messages
    //     query = Message.find({requester: req.user._id})
    //         .populate("puzzle")
    //         .sort("-updatedAt")
    // }
    // query.exec(function(err, messages){
    //     res.render('messages/index', {title: req.query.filter === 'received' ? 'Received Messages' : 'Sent Messages', messages});
    // });
}

function show(req, res) {
    Message.findById(req.params.id)
        .populate('content')
        .exec(function(err, puzzle, message) {
        res.render('messages/show', {title: 'Message Detail', puzzle, message});
    });
};
    
