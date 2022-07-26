var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


router.get('/messages', messagesCtrl.index); 
router.post('/puzzles/:puzzleId/owner/:ownerId/messages', messagesCtrl.create);


module.exports = router;