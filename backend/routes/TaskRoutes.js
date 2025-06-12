const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.userId });
  await task.save();
  res.status(201).json(task);
});

router.get('/all', auth, async (req, res) => {
  await Task.updateMany(
    { userId: req.userId, deadline: { $lt: new Date() }, status: "Pending" },
    { status: "Missing" }
  );
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.put('/update-status/:id', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ message: "Not found" });
  task.submissionDate = new Date();
  task.status = task.submissionDate > new Date(task.deadline) ? "Done Late" : "Completed";
  await task.save();
  res.json(task);
});

router.put('/reset-status/:id', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ message: "Not found" });
  task.submissionDate = null;
  task.status = "Pending";
  await task.save();
  res.json(task);
});

module.exports = router;
