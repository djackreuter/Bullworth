const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Mission = mongoose.model('Mission', MissionSchema);

module.exports = { Mission }