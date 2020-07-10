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

const socketIo = require('socket.io');
const io = socketIo(app.listen(process.env.PORT || 8000));
mongoose.connect('mongodb+srv://adminUser:rmPJhn8xNi2JGcX@cluster0.35pbf.mongodb.net/NewWaveDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
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
/*app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});*/