const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Mission = new mongoose.Model('Mission', MissionSchema);

module.exports = { Mission }