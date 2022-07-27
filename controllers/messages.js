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
        res.redirect(`/messages?filter=all`); 
    });
} 

// function index(req, res){ 
//     let query; 
//     if (req.query.filter === 'received') {
//         query = Message.find({recipient: req.user._id})
//             .populate("puzzle")
//             .sort("-updatedAt")
//     } else { // sent messages
//         query = Message.find({sender: req.user._id})
//             .populate("puzzle")
//             .sort("-updatedAt")
//     }
//     query.exec(function(err, messages){
//         res.render('messages/index', {title: req.query.filter === 'received' ? 'Received Messages' : 'Sent Messages', messages});
//     });
//  }

<<<<<<< HEAD
 function index(req,res) {
    let query = Message.find({$or: [{recipient: req.user._id}, {sender: req.user._id}]})
    .populate("puzzle")
    .sort("-updatedAt")
    query.exec(function(err, messages){
        res.render('messages/index', {title: "All Messages", messages});
    });
 }
=======
 
>>>>>>> 5a8a1f2 (Re-add Edit & Update)
