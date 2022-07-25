const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 

module.exports = {
    // index,
    show, 
    create
}

// function index(req, res){ 
//        res.render('messages/index', {title: 'All Messages'});
//    }

function show(req, res){
    Puzzle.findOne(req.params.id)
    Message.findOne(req.params.id, function(err, message){ 
    res.render('messages/show', {title: 'Message Detail', message}); 
    })
}

function create(req, res){ 
    // req.body.user = req.user._id; 
    // req.body.userName = req.user.name; 
    // req.body.userAvatar = req.user.avatar; 
    const message = new Message(); 
    
    message.sender = req.user._id; 
    message.recipient = req.body.user; 

    message.body = req.body
    message.push(req.body);
    message.save(function(err, messages){ 
        if (err) return res.render('messages/show')
        res.redirect(`/messages/:id`, messages)
    })
}

