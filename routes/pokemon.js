const express = require('express');
const axios = require('axios'); 
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
  .then (favorites => {
    res.render('pokemon/index', {faves: favorites})
  })
  .catch(err => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);
  db.pokemon.findOrCreate({
    where: {name: req.body.name},
    defaults: {name: req.body.name}
  })
  .then(([created, wasCreated])=>{
    // res.send(created)
    res.redirect('/')
  })
  .catch(err=>{
    console.log(err)
  })
});

// GET Pokemon ID // Details
router.get('/:idx', function(req,res){
  db.pokemon.findOne({
    where: {id: req.params.idx}
  }).then (found => {
    const pokemonDetail = `http://pokeapi.co/api/v2/pokemon/${found.name}`;
    axios.get(pokemonDetail)
      .then(response => {
        // res.send(response.data)
        res.render('pokemon/show', {pokemon: response.data})
      }).catch(err=>{
        console.log(err)
      })
    
  }).catch(err=>{
    console.log(err)
  })

})


module.exports = router;
