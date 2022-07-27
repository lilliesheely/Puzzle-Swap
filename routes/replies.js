var express = require('express');
var router = express.Router();
const repliesCtrl  = require('../controllers/replies'); 
const isLoggedIn = require('../config/auth');


router.post('/messages/:id/replies', repliesCtrl.create);

module.exports = router;
