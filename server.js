const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cliques = require('routes/api/cliques');
const students = require('routes/api/students');
const missions = require('routes/api/missions');
const classes = require('routes/api/classes');
const locations = require('routes/api/locations');

const db = require('./config/keys').MONGODB_URI;
const app = express();

app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Could not connect to MongoDB'));

app.use('/api/cliques', cliques);
app.use('/api/students', students);
app.use('/api/missions', missions);
app.use('/api/classes', classes);
app.use('/api/locations', locations);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));