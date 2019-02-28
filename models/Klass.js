const mongoose = require('mongoose');

const KlassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Klass = mongoose.model('Klass', KlassSchema);

module.exports = { Klass }