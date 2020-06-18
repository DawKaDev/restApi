const express = require('express');
const router = express.Router();
const db = require('../db');
const randomID = require('@rysiek/randomid-generator');

router.route('/testimonials')
  .get((req, res) => {
    res.json(db.testimonials);
  })
  .post((req, res) => {
    const {author, text} = req.body;
    db.testimonials.push({
      id: randomID(10),
      author: author,
      text: text,
    });
    res.json({message: 'OK'});
  });

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id')
  .get((req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
  })
  .put((req, res) => {
    const {author, text} = req.body;
    const element = db.testimonials.filter(item => item.id == req.params.id);
    element[0].author = author;
    element[0].text = text;
    res.json({message: 'OK'});
  })
  .delete((req, res) => {
    const element = db.testimonials.filter(item => item.id == req.params.id);
    db.testimonials.splice(db.testimonials.indexOf(element[0]), 1);
    res.json({message: 'OK'});
  });

module.exports = router;