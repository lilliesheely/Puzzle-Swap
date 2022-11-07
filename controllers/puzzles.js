const Puzzle = require('../models/puzzle'); 
const Message = require('../models/message'); 

module.exports = {
    index, 
    new: newPuzzle, 
    create, 
    show, 
    delete: deletePuzzle, 
    edit, 
    update
}

function index(req, res) {
   const puzzle = Puzzle.find({})
   .sort('-pieceAmount')
   .exec(function(err, puzzles) {
       res.render('puzzles/index', {title: 'All Puzzles', puzzles}); 
   }); 
}

function newPuzzle(req, res) { 
    res.render('puzzles/new', {title: 'Add New Puzzle'}); 
}

function create(req, res){
    req.body.user = req.user._id; 
    req.body.userName = req.user.name; 
    req.body.userAvatar = req.user.avatar; 
    const puzzle = new Puzzle(req.body); 
    puzzle.save(function(err) {
        if (err) return res.redirect('/puzzles/new');
        res.redirect('/puzzles');
    });
}

function show(req, res){
    Puzzle.findById(req.params.id, function(err, puzzle) {
        Message.find({puzzle: req.params.id}, function(err, message) {
            res.render('puzzles/show', {title: `${puzzle.name}`, puzzle, message});
        })  
    }); 
}

async function deletePuzzle(req, res, next) {
    try {
        const puzzle = await Puzzle.findOneAndDelete({_id: req.params.id, user: req.user._id});
        console.log(puzzle); 
        if (!puzzle) throw new Error('Not your puzzle to remove!');
        await Message.deleteMany({puzzle: req.params.id});
        res.redirect(`/puzzles`)
    } catch (err) {
        return next (err);
    }
} 

function edit(req, res){
   Puzzle.findById(req.params.id, function(err, puzzle){
        res.render('puzzles/edit', {title: 'Edit Puzzle', puzzle})
    });
}

function update(req, res){ 
    Puzzle.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, function(err, puzzle) {
        if (err) return res.render(`/puzzles/${puzzle._id}/edit`);
        res.redirect(`/puzzles/${puzzle._id}` );
    });
}
