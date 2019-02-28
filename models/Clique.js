const mongoose = require('mongoose');

const CliqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]
});

const Clique = mongoose.model('Clique', CliqueSchema);

module.exports = { Clique }