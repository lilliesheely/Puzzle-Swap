var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


router.get('/messages', messagesCtrl.index); 
router.post('/messages', messagesCtrl.create);
router.get('/messages/:id', messagesCtrl.show);


module.exports = router;