const Genre = require('../models/genre.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Genre.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.getOneById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if(!genre) res.status(404).json({message: 'Not Found'});
    else res.json(genre);
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.add = async (req, res) => {
  try{
    const { title } = req.body;
    const newGenre = new Genre({ title: title });
    await newGenre.save();
    res.json({message: 'OK'});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
}

exports.update = async (req, res) => {
  const { title } = req.body;
  try {
    const genre = await Genre.findById(req.params.id);
    if(genre) {
      await Genre.updateOne({ _id: req.params.id }, { $set: { title: title }});
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
    const genre = await Genre.findById(req.params.id);
    if(genre) {
      await Genre.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not Found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}