var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


// router.get('/messages/:id', messagesCtrl.index); 
router.get('/puzzles/:id/messages/:id', messagesCtrl.show);
router.post('/puzzles/:id/messages/:id/comments', messagesCtrl.create);

module.exports = router;