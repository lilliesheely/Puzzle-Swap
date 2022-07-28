var express = require('express');
var router = express.Router();
const repliesCtrl  = require('../controllers/replies'); 

router.delete('/replies/:id', repliesCtrl.deleteReply);
router.post('/messages/:id/replies', repliesCtrl.createReply);

module.exports = router;