var express = require('express');
var router = express.Router();
const puzzlesCtrl  = require('../controllers/puzzles'); 

router.get('/', puzzlesCtrl.index); 
router.get('/new', puzzlesCtrl.new); 
router.post('/', puzzlesCtrl.create);
router.get('/:id', puzzlesCtrl.show);  
router.delete('/:id', puzzlesCtrl.delete); 


module.exports = router;
