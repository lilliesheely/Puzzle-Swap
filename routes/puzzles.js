var express = require('express');
var router = express.Router();
const puzzlesCtrl  = require('../controllers/puzzles'); 

router.get('/', puzzlesCtrl.index); 
//router.get('/)

module.exports = router;
