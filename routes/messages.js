var express = require('express');
var router = express.Router();
const messagesCtrl  = require('../controllers/messages'); 


router.get('/', messagesCtrl.index); 
router.get('/:id', messagesCtrl.show);

module.exports = router;