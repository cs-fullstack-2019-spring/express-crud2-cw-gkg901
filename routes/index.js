var express = require('express');
var router = express.Router();
var Posts = require('../models/PostSchema');

/* GET home page. SHOWS ALL POSTS */
router.get('/', function(req, res) {
  Posts.find({}, (errors,results)=>{
    if (errors) res.send(errors);
    else{
      context = {
        title: " G's Posts",
        allPosts: results,
      }
    }res.render('index', context);
  })
});

// RENDERS CREATE PAGE
router.get('/create', (req,res)=> res.render('create'));

//SAVES POST ON SUBMIT FROM CREATE PAGE, REDIRECTS TO INDEX
router.get('/savePost', (req,res)=>{
  Posts.create({
    userId: req.query.userId,
    id: req.query.id,
    title: req.query.title,
    body: req.query.body}, (errors)=>{
    if (errors) res.send(errors);
    else res.redirect('/');
  })
});

//RENDERS UPDATE PAGE
router.get('/update',(req,res)=>res.render('update'));

//FINDS POST USING ID, UPDATES TITLE AND BODY USING QUERIES FROM FORM ON UPDATE PAGE. REDIRECTS TO INDEX
router.get('/updatePost', (req,res)=>{
    Posts.findOneAndUpdate({id:req.query.id},{title:req.query.title, body: req.query.body},(error)=>{
        if (error) res.send(error);
        else res.redirect('/')
    })
});


module.exports = router;
