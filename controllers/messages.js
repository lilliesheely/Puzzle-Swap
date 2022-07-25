const Message = require('../models/message'); 
const Puzzle = require('../models/puzzle'); 

module.exports = {
    show, 
    create
}

function show(req, res){
    Message.findOne(req.params.id, function(err, message){ 
        res.render('messages/show', {title: 'Message Detail', message}); 
    })
}

function create(req, res){ 
    const message = new Message(req.body) 
        res.redirect(`/messages/${message._id}`)
}; 

    // req.body.user = req.user._id; 
    // req.body.userName = req.user.name; 
    // req.body.userAvatar = req.user.avatar; 
    // const message = new Message(req.body); 
    
    // message.sender = req.body.user; 
    // message.body = req.body
    // message.push(req.body);
    // message.save(function(err, messages){ 
    //     if (err) return res.render('messages/show')




    // function index(req, res){ 
//        res.render('messages/index', {title: 'All Messages'});
//    }


// function newMessage(req, res) {
//         res.render('messages/show', {title: "Request to Borrow"}); 
// }
