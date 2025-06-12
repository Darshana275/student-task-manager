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


app.post('/predict-deadline', (req, res) => {
    let options = {
        mode: 'text',
        pythonPath: 'python3',
        scriptPath: './ml_models',
        args: [req.body.days_left]
    };

    PythonShell.run('predict_deadline.py', options, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ prediction: results[0] });
    });
});
// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));