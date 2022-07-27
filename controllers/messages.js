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
    req.body.user = req.user._id
    req.body.requester = req.user._id; 
    req.body.owner = req.params.ownerId;  
    req.body.puzzle = req.params.puzzleId;
    req.body.requesterName = req.user.name; 
    req.body.requesterAvatar = req.user.avatar; 
    console.log(req.body, "First Message")
    const message = new Message(req.body);
    message.replies.push(req.body); 
    message.save(function(err, message){
        console.log(message, message.replies, "create first message")
        res.redirect(`/messages/${message._id}`);
    });
} 

function index(req, res){ 
    Message.find({ $or: [{owner: req.user._id}, {requester: req.user._id} ]})
        .populate('puzzle')
        .exec(function(err, messages){
        res.render('messages/index', {title: 'All Messages', messages})
    });
}

function show(req, res) {
    Message.findById(req.params.id)
        .populate('puzzle')
        .sort('updateAt')
        .exec(function(err, message) {
            res.render('messages/show', {title: 'Message Detail', message});
    }); 
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
