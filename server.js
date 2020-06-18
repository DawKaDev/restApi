const express = require('express');
const randomID = require('@rysiek/randomid-generator');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() + db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  db.testimonials.push({
    id: randomID(10),
    author: author,
    text: text,
  });
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const {author, text} = req.body;
  const element = db.testimonials.filter(item => item.id == req.params.id);
  element[0].author = author;
  element[0].text = text;
  res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const element = db.testimonials.filter(item => item.id == req.params.id);
  db.splice(db.testimonials.indexOf(element[0]), 1);
  res.json({message: 'OK'});
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});