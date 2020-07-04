const express = require('express');
const router = express.Router();
const db = require('../db');
const randomID = require('@rysiek/randomid-generator');

router.route('/seats')
  .get((req, res) => {
    res.json(db.seats);
  })
  .post((req, res) => {
    const {day, seat, client, email} = req.body;
  
    if(db.seats.some(item => item.day === Number(day) && item.seat === Number(seat)))
      res.json({message: 'The slot is already taken...'});
      
    db.seats.push({
      id: randomID(10),
      day: Number(day),
      seat: Number(seat),
      client: client,
      email: email,
    })
    req.io.emit('seatsUpdated', db.seats);
    res.json({message: 'OK'});
  });

router.route('/seats/:id')
  .get((req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
  })
  .put((req, res) => {
    const {day, seat, client, email} = req.body;
    const element = db.seats.filter(item => item.id == req.params.id);
    element[0].day = day;
    element[0].seat = seat;
    element[0].client = client;
    element[0].email = email;
    res.json({message: 'OK'});
  })
  .delete((req, res) => {
    const element = db.seats.filter(item => item.id == req.params.id);
    db.seats.splice(db.seats.indexOf(element[0]), 1);
    res.json({message: 'OK'});
  });

module.exports = router;