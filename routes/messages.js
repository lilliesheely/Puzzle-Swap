var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


router.get('/messages', messagesCtrl.index); 
router.post('/puzzles/:puzzleId/owner/:ownerId/messages', messagesCtrl.create);
// router.get('/puzzles/:id/messages/new', messagesCtrl.new); 

module.exports = router;