require('dotenv').config();
const express = require('express'), mongoose = require('mongoose'), cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const taskRoutes = require('./routes/TaskRoutes');

const app = express();
app.use(cors(), express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
const { PythonShell } = require('python-shell');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));