const express = require('express');
const db = require('./models');

// db.pokemon
//   .create({
//     name: "Charmander",
//   })
//   .then(function (poke) {
//     console.log("Created: ", poke.name);
//   });

// db.pokemon.findAll().then(function (poke) {
//   console.log("Found: ", poke.name);
// });

db.pokemon.update({
  pokeId: '1'
},
{
  where: {
    name: 'bulbasaur'
  }
}).then(numRowsChanged => {
  console.log(numRowsChanged)
})