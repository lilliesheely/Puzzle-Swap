const Puzzle = require('../models/puzzle'); 

module.exports = {
    index, 
    new: newPuzzle, 
    create, 
    show
}

function index(req, res) {
    Puzzle.find({}, function(err, puzzles) {
        res.render('puzzles/index', {title: 'All Puzzles', puzzles}); 
    })
}

function newPuzzle(req, res){ 
        res.render('puzzles/new',{title: 'Add New Puzzle'})
    }

function create(req, res){
    const puzzle = new Puzzle(req.body); 
    puzzle.save(function(err) {
        if (err) return res.redirect('/puzzles/new');
        console.log(puzzle);
        res.redirect('/puzzles');
    })
}

function show(req, res){
    Puzzle.findById(req.params.id, function(err, puzzle){
        res.render('puzzles/show', {title: 'Puzzle Detail', puzzle})

    }) 
}