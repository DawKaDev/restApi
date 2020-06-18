const express = require('express');
const router = express.Router();
const db = require('../db');
const randomID = require('@rysiek/randomid-generator');

router.route('/concerts')
  .get((req, res) => {
    res.json(db.concerts);
  })
  .post((req, res) => {
    const {performer, genre, price, day, image} = req.body;
    db.concerts.push({
      id: randomID(10),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    res.json({message: 'OK'});
  });

router.route('/concerts/:id')
  .get((req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
  })
  .put((req, res) => {
    const {performer, genre, price, day, image} = req.body;
    const element = db.concerts.filter(item => item.id == req.params.id);
    element[0].performer = performer;
    element[0].genre = genre;
    element[0].price = price;
    element[0].day = day;
    element[0].image = image;
    res.json({message: 'OK'});
  })
  .delete((req, res) => {
    const element = db.concerts.filter(item => item.id == req.params.id);
    db.concerts.splice(db.concerts.indexOf(element[0]), 1);
    res.json({message: 'OK'});
  });

module.exports = router;