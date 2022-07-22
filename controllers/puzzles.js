const Puzzle = require('../models/puzzle'); 


module.exports = {
    index
}

function index(req, res) {
    Puzzle.find({}, function(err, puzzles) {
        res.render('puzzles/index', {title: 'All Puzzles', puzzles}); 
    })
}