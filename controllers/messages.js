const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 
const User = require('../models/user'); 

module.exports = {
    create, 
    index,
    show,   
    createReply, 
    deleteReply 
}

function create(req, res){ 
    req.body.user = req.user._id
    req.body.requester = req.user._id; 
    req.body.owner = req.params.ownerId;  
    req.body.puzzle = req.params.puzzleId;
    req.body.requesterName = req.user.name;
    req.body.userName = req.user.name;     
    req.body.requesterAvatar = req.user.avatar; 
    const message = new Message(req.body);
    message.replies.push(req.body); 
    message.save(function(err, message){
        res.redirect(`/messages`);
    });
} 

function index(req, res){ 
    Message.find({ $or: [{owner: req.user._id}, {requester: req.user._id} ]})
        .populate('puzzle')
        .sort('-updatedAt')
        .exec(function(err, messages){
        res.render('messages/index', {title: 'All Messages', messages})
    });
}


function show(req, res) {
    const message = Message.findById(req.params.id) 
        .populate('puzzle')
        .exec(function(err, message) {
            message.read = true; 
            message.save(function(err){ 
                message.replies.sort((a,b) => (b.createdAt) - (a.createdAt));
                res.render('messages/show', {title: `Request for puzzle: "${message.puzzle.name}"`, message});
            });
        })
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

async function deleteReply(req, res, next) { 
    try {
        const message = await Message.findOne({'replies._id': req.params.id, 'replies.user': req.user._id})
        if (!message) throw new Error('Not your message to delete!');
        message.replies.remove(req.params.id);
        await message.save(); 
        res.redirect(`/messages/${message._id}`)
    } catch (err) {
        return next (err);
    }
} 



