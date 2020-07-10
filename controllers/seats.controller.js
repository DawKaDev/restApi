const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getOneById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({message: 'Not Found'});
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.add = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    req.io.emit('seatsUpdated', await(Seat.find()));
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.update = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const findSeat = await Seat.findById(req.params.id);
    if(findSeat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not Found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not Found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}