const Message = require('../models/message'); 


module.exports = {
    index,
    show
}

function index(req, res){ 
       res.render('messages/index', {title: 'All Messages'});
   }

function show(req, res){
    Message.findById(req.params.id, function(err, message){
    res.render('messages/show', {title: 'Puzzle Detail', puzzle}); 
    })
}



