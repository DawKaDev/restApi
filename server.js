require('./env');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
/* import routes */
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const genresRoutes = require('./routes/genres.routes');
const server = app.listen(process.env.PORT || 8000);
const socketIo = require('socket.io');
const io = socketIo(server);

const dbURI = process.env.NODE_ENV === 'production' ? process.env.REMOTE_DB : process.env.LOCAL_DB;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', genresRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

io.on('connection', (socket) => {
  console.log('New socket');
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;