const express = require('express'), bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) return res.status(400).json({ message: "Min 6 chars" });
  if (await User.findOne({ email })) return res.status(400).json({ message: "Email exists" });
  
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: "Registered" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, name: user.name });
});

module.exports = router;
