const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find().populate('genre'));
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getOneById = async (req, res) => {
  try {
    const concert = await (Concert.findById(req.params.id).populate('genre'));
    if(!concert) res.status(404).json({message: 'Not Found'});
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({performer: req.params.performer}).populate('genre');
    if(!concerts) res.status(404).json({message: 'Not Found'});
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({genre: req.params.genre}).populate('genre');
    if(!concerts) res.status(404).json({message: 'Not Found'});
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({$and: [{price: {$gte: req.params.price_min}},{price: {$lte: req.params.price_max}}]}).populate('genre');
    if(!concerts) res.status(404).json({message: 'Not Found'});
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({day: req.params.day}).populate('genre');
    if(!concerts) res.status(404).json({message: 'Not Found'});
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.add = async (req, res) => {
  try{
    const { performer, genre, day, price, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, day: day, price: price, image: image });
    await newConcert.save();
    res.json({message: 'OK'});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.update = async (req, res) => {
  const { performer, genre, day, price, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, day: day, price: price, image: image }});
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
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not Found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}