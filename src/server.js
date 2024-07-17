const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mentor-student')
  .then(() =>{ console.log('MongoDB connected');
})
  .catch((err) =>{ console.log('MongoDB Connection error:',err);
});

// Routes
app.use('/api', require('./routes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
