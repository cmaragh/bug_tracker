const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  openedByFirstName: {
    type: String,
    required: true,
  },
  openedByLastName: {
    type: String,
    required: true,
  },
  assignedto: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bug", bugSchema);
