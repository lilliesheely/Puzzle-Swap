var express = require('express');
var router = express.Router();
const puzzlesCtrl  = require('../controllers/puzzles'); 
const isLoggedIn = require('../config/auth');

router.get('/', puzzlesCtrl.index); 
router.get('/new', isLoggedIn, puzzlesCtrl.new); 
router.post('/', isLoggedIn, puzzlesCtrl.create);
router.get('/:id', puzzlesCtrl.show);  
router.delete('/:id', isLoggedIn, puzzlesCtrl.delete); 
router.get('/:id/edit', isLoggedIn, puzzlesCtrl.edit); 
router.put('/:id', isLoggedIn, puzzlesCtrl.update); 


module.exports = router;
