const Puzzle = require('../models/puzzle'); 
const Message = require('../models/message'); 

module.exports = {
    index, 
    new: newPuzzle, 
    create, 
    show, 
    delete: deletePuzzle
}

function index(req, res) {
   const puzzle = Puzzle.find({})
   .sort('-pieceAmount')
   .exec(function(err, puzzles) {
       res.render('puzzles/index', {title: 'All Puzzles', puzzles}); 
   }) 
}

function newPuzzle(req, res){ 
        res.render('puzzles/new',{title: 'Add New Puzzle'})
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
    Puzzle.findById(req.params.id, function(err, puzzle){
        res.render('puzzles/show', {title: 'Puzzle Detail', puzzle});
    }); 
}

async function deletePuzzle(req, res, next) {
    const message = Message.find({puzzle: req.params.id}); 
    try {
        const puzzle = await Puzzle.findById(req.params.id)
        console.log(puzzle); 
        if (!puzzle) throw new Error('Not your puzzle to remove!');
        puzzle.delete(req.params.id);   
        await 
        res.redirect(`/puzzles`)
    } catch (err) {
        return next (err);
    }
} 

