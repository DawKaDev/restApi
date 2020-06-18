const express = require('express');
const randomID = require('@rysiek/randomid-generator');
const app = express();
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() + db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  db.push({
    id: randomID(10),
    author: author,
    text: text,
  });
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const {author, text} = req.body;
  const element = db.filter(item => item.id == req.params.id);
  element[0].author = author;
  element[0].text = text;
  res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const element = db.filter(item => item.id == req.params.id);
  db.splice(db.indexOf(element[0]), 1);
  res.json({message: 'OK'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});