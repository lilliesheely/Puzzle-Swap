var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


router.get('/messages', messagesCtrl.index); 
router.post('/puzzles/:puzzleId/owner/:ownerId/messages', messagesCtrl.create);
router.get('/messages/:id', messagesCtrl.show);
router.post('/messages/:id', messagesCtrl.createReply);
router.delete('/messages/:id', messagesCtrl.deleteReply); 

module.exports = router;