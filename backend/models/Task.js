const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  status: { type: String, default: "Pending" },
  category: { type: String, default: "General" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissionDate: Date
}, {
  timestamps: true // 👈 This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Task', TaskSchema);
